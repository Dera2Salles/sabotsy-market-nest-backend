import { fileReturnedType } from '@/application/repository/fileRepository';
import { FileRepository } from '@/domain/repository';
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
