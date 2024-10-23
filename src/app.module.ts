import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TestModule } from './pipes/test.module';
import { MidModule } from './mid/mid.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, TestModule, MidModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
