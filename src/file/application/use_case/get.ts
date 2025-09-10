import { fileReturnedType } from '@/file/application/fileRepository';
import { FileRepository } from '@/file/domain/repository/fileRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetFileUseCase {
  constructor(
    @Inject(FileRepository) private source: FileRepository<fileReturnedType>,
  ) {}

  async exexute(fileName: string) {
    return this.source.get(fileName);
  }
}
