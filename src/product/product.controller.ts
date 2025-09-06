import {
  BadRequestException,
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FastifyUploadInterceptor } from './fastifyInterceptor';
import { FastifyRequest, FastifyReply } from 'fastify';

import {
  Get,
  Res,
  HttpException,
  HttpStatus,
  Query,
  Param,
} from '@nestjs/common';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { join } from 'path';
import * as mime from 'mime-types';

import { ProductService } from './product.service';
import { ProductEntity } from '@/domain/Entities/Product';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  private readonly basePath = join(process.cwd(), 'uploads');

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async insertProduct(@Body() product: ProductEntity[]) {
    return this.service.callInsertProduct(product);
  }
  @Get()
  async get(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.service.callGetProduct(page, limit);
  }

  @Get('stream/:filename')
  async streamFile(
    @Param('filename') filename: string,
    @Query('disposition') disposition: 'attachment' | 'inline' = 'attachment',
    @Res() reply: FastifyReply,
  ) {
    if (filename.includes('..') || filename.includes('/')) {
      throw new HttpException(
        'Nom de fichier invalide',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filePath = join(this.basePath, filename);

    try {
      await fsPromises.access(filePath, fs.constants.F_OK | fs.constants.R_OK);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const contentType = mime.lookup(filePath) || 'application/octet-stream';

      reply.header('Content-Type', contentType);
      reply.header(
        'Content-Disposition',
        `${disposition}; filename="${filename}"`,
      );

      const stream = fs.createReadStream(filePath);

      stream.on('error', (err) => {
        console.error('Erreur lors du streaming :', err);
        reply
          .code(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Erreur interne lors du streaming');
      });

      reply.send(stream);
    } catch (error) {
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

  @UseGuards(AuthGuard('jwt'))
  @Post('file')
  @UseInterceptors(new FastifyUploadInterceptor({ dest: './uploads' }))
  uploadFile(@Req() req: FastifyRequest) {
    if (!req.fileData) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      message: 'File uploaded successfully',
      file: {
        originalname: req.fileData.originalname,
        mimetype: req.fileData.mimetype,
        size: req.fileData.size,
        path: req.fileData.path,
        url: `/uploads/${req.fileData.originalname}`,
      },
    };
  }
}
