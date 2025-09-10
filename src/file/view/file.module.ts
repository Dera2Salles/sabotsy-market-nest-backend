import { Logger, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { GetFileUseCase } from '@/file/application/use_case/get';
import { FileRepositoryImpl } from '@/file/application/fileRepository';
import { FileService } from './file.service';
import { FileRepository } from '../domain/repository/fileRepository';

@Module({
  controllers: [FileController],
  providers: [
    Logger,
    GetFileUseCase,
    { provide: FileRepository, useClass: FileRepositoryImpl },
    FileService,
  ],
})
export class FileModule {}
