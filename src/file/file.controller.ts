import {
  Controller,
  Get,
  Res,
  HttpException,
  HttpStatus,
  Query,
  Logger,
  Param,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as fs from 'fs'; // Pour createReadStream
import * as fsPromises from 'fs/promises'; // Pour access (vérification asynchrone)
import { join } from 'path';
import * as mime from 'mime-types'; // Pour déterminer le Content-Type

@Controller('files')
export class FileController {
  constructor(private logger: Logger) {}
  // Chemin de base vers le dossier des fichiers (modifiable selon votre structure)
  private readonly basePath = join(process.cwd(), 'uploads');

  /**
   * Endpoint pour streamer un fichier spécifique.
   *
   * @param filename - Nom du fichier à streamer (ex. : 'monfichier.pdf').
   * @param disposition - Query param optionnel : 'attachment' (force téléchargement) ou 'inline' (affiche dans le navigateur). Défaut : 'attachment'.
   * @param reply - Objet de réponse Fastify pour envoyer le stream.
   *
   * Exemple d'appel : GET /files/stream/monfichier.pdf?disposition=inline
   *
   * Fonctionnement :
   * 1. Valide le nom de fichier pour éviter les attaques (pas de '..').
   * 2. Vérifie si le fichier existe et est lisible.
   * 3. Détermine le Content-Type via mime-types.
   * 4. Crée un stream de lecture et l'envoie au client.
   * 5. Gère les erreurs (fichier introuvable, etc.).
   */
  @Get('stream/:filename')
  async streamFile(
    @Param('filename') filename: string,
    @Query('disposition') disposition: 'attachment' | 'inline' = 'attachment',
    @Res() reply: FastifyReply,
  ) {
    // Validation du nom de fichier pour éviter les path traversal
    if (filename.includes('..') || filename.includes('/')) {
      throw new HttpException(
        'Nom de fichier invalide',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filePath = join(this.basePath, filename);

    try {
      // Vérifie l'existence et les permissions de lecture de manière asynchrone
      await fsPromises.access(filePath, fs.constants.F_OK | fs.constants.R_OK);

      // Détermine le Content-Type basé sur l'extension (ex. : 'application/pdf', 'image/png')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const contentType = mime.lookup(filePath) || 'application/octet-stream';

      // Définit les en-têtes HTTP
      reply.header('Content-Type', contentType);
      reply.header(
        'Content-Disposition',
        `${disposition}; filename="${filename}"`,
      );

      // Crée un stream de lecture pour le fichier (efficace pour gros et petits fichiers)
      const stream = fs.createReadStream(filePath);

      // Gestion des événements du stream (optionnel, pour logging ou erreurs avancées)
      stream.on('error', (err) => {
        console.error('Erreur lors du streaming :', err);
        reply
          .code(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Erreur interne lors du streaming');
      });

      // Envoie le stream au client
      reply.send(stream);
    } catch (error) {
      // Gestion des erreurs spécifiques
      if (error.code === 'ENOENT') {
        throw new HttpException('Fichier non trouvé', HttpStatus.NOT_FOUND);
      } else if (error.code === 'EACCES') {
        throw new HttpException(
          'Permissions insuffisantes pour lire le fichier',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(
          'Erreur interne',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('video/:filename')
  async streamVideo(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) reply: FastifyReply,
    @Res() request: FastifyRequest,
  ) {
    // Validation du nom de fichier
    if (
      filename.includes('..') ||
      filename.includes('/') ||
      filename.includes('\\')
    ) {
      this.logger.warn(`Tentative d'accès non autorisé : ${filename}`);
      throw new HttpException(
        'Nom de fichier invalide',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validation des extensions vidéo
    const allowedExtensions = ['.mp4', '.webm', '.mov'];
    const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      this.logger.warn(`Extension non autorisée : ${ext}`);
      throw new HttpException(
        'Type de fichier non supporté',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filePath = join(this.basePath, filename);

    try {
      // Vérifier l'existence et les métadonnées
      const stats = await fsPromises.stat(filePath);
      if (!stats.isFile()) {
        throw new HttpException(
          'Le chemin ne pointe pas vers un fichier',
          HttpStatus.BAD_REQUEST,
        );
      }

      const contentType = mime.lookup(filePath) || 'application/octet-stream';

      // Gestion des range requests
      const range = request.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

        if (start >= stats.size || end >= stats.size || start > end) {
          this.logger.warn(`Range invalide pour ${filename}: ${range}`);
          reply.header('Content-Range', `bytes */${stats.size}`);
          throw new HttpException(
            'Range non satisfiable',
            HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
          );
        }

        reply.status(206); // Partial Content
        reply.header('Content-Range', `bytes ${start}-${end}/${stats.size}`);
        reply.header('Accept-Ranges', 'bytes');
        reply.header('Content-Length', end - start + 1);
        reply.header('Content-Type', contentType);
        reply.header('Content-Disposition', `inline; filename="${filename}"`);

        const stream = fs.createReadStream(filePath, { start, end });
        this.logger.log(
          `Streaming vidéo partiel ${filename}: bytes ${start}-${end}`,
        );

        stream.on('error', (err) => {
          this.logger.error(
            `Erreur de stream pour ${filename}: ${err.message}`,
          );
          reply
            .code(HttpStatus.INTERNAL_SERVER_ERROR)
            .send('Erreur lors du streaming');
        });

        return reply.send(stream);
      }

      // Streaming complet
      reply.header('Content-Length', stats.size);
      reply.header('Content-Type', contentType);
      reply.header('Accept-Ranges', 'bytes');
      reply.header('Content-Disposition', `inline; filename="${filename}"`);

      const stream = fs.createReadStream(filePath);
      this.logger.log(`Streaming vidéo complet ${filename}`);

      stream.on('error', (err) => {
        this.logger.error(`Erreur de stream pour ${filename}: ${err.message}`);
        reply
          .code(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Erreur lors du streaming');
      });

      return reply.send(stream);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.logger.warn(`Fichier non trouvé : ${filename}`);
        throw new HttpException('Fichier non trouvé', HttpStatus.NOT_FOUND);
      } else if (error.code === 'EACCES') {
        this.logger.warn(`Permissions insuffisantes pour ${filename}`);
        throw new HttpException(
          'Permissions insuffisantes',
          HttpStatus.FORBIDDEN,
        );
      }
      this.logger.error(`Erreur inattendue pour ${filename}: ${error.message}`);
      throw new HttpException(
        'Erreur interne',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
