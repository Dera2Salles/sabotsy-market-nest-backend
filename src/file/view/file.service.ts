import { GetFileUseCase } from '@/file/application/use_case/get';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor(private getFile: GetFileUseCase) {}

  async callGetFile(fileName: string) {
    const result = await this.getFile.exexute(fileName);
    if (result.status == 'failure') throw new ForbiddenException();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { mimeType: result.data.mimetype, stream: result.data.file };
  }
}
