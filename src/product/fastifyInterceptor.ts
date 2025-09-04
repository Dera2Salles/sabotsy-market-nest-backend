import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
// import { randomUUID } from 'crypto';
// import { extname } from 'path';
import { FastifyRequest } from 'fastify';

import { createWriteStream, promises as fs } from 'fs';
import { pipeline } from 'stream/promises';

declare module 'fastify' {
  interface FastifyRequest {
    fileData?: {
      originalname: string;
      mimetype: string;
      size: number;
      path: string;
    };
  }
}

@Injectable()
export class FastifyUploadInterceptor implements NestInterceptor {
  constructor(private readonly options: { dest: string }) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    if (!req.isMultipart()) {
      throw new BadRequestException('Content-Type must be multipart/form-data');
    }

    try {
      await fs.mkdir(this.options.dest, { recursive: true });

      const parts = req.parts();
      let fileProcessed = false;

      for await (const part of parts) {
        if (part.type === 'file' && part.fieldname === 'file') {
          fileProcessed = true;

          if (!part.mimetype?.match(/\/(jpg|jpeg|png|gif|webp|mp4)$/)) {
            throw new BadRequestException('Type de fichier non autorisé');
          }

          const filename = part.filename;
          const filePath = `${this.options.dest}/${filename}`;

          const writeStream = createWriteStream(filePath);
          await pipeline(part.file, writeStream);

          req.fileData = {
            originalname: part.filename,
            mimetype: part.mimetype,
            size: writeStream.bytesWritten,
            path: filePath,
          };

          break;
        }
      }

      if (!fileProcessed) {
        throw new BadRequestException('file not received');
      }

      return next.handle();
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'upload failed',
      );
    }
  }
}
