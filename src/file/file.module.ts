import { Logger, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { GetFileUseCase } from '@/application/use-cases/file/get';
import { FileRepository } from '@/domain/repository';
import { FileRepositoryImpl } from '@/application/repository/fileRepository';
import { FileService } from './file.service';

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
