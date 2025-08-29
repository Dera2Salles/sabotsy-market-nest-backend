import { Logger, Module } from '@nestjs/common';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [Logger],
})
export class FileModule {}
