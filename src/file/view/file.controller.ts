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
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { join } from 'path';
import * as mime from 'mime-types';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(
    private logger: Logger,
    private service: FileService,
  ) {}

  private readonly basePath = join(process.cwd(), 'uploads');

  @Get('stream/:filename')
  async streamFile(
    @Param('filename') fileName: string,
    @Query('disposition') disposition: 'attachment' | 'inline' = 'attachment',
    @Res() reply: FastifyReply,
  ) {
    try {
      const result = await this.service.callGetFile(fileName);
      reply.header('Content-Type', result.mimeType);
      reply.header(
        'Content-Disposition',
        `${disposition}; filename="${fileName}"`,
      );
      reply.send(result.stream);
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
