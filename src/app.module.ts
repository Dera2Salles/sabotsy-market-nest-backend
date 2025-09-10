import { Module } from '@nestjs/common';

import { AuthModule } from './auth/view/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/view/file.module';
import { OrderModule } from './order/view/order.module';
import { ProductModule } from './product/view/product.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [],
})
export class AppModule {}
