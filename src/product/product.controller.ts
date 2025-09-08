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
import { join } from 'path';

import { ProductService } from './product.service';
import { ProductEntity } from '@/domain/Entities/Product';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  private readonly basePath = join(process.cwd(), 'uploads');

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async insertProduct(@Body() product: ProductEntity[], @Req() req: Request) {
    const productToInsert: ProductEntity[] = product.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      producerId: req.user as string,
      unit: item.unit,
      filename: item.filename,
    }));
    return this.service.callInsertProduct(productToInsert);
  }
  @Get()
  async getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.service.callGetProduct(page, limit);
  }

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
