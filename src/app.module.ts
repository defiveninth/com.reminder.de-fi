import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TestModule } from './pipes/test.module';
import { MidModule } from './mid/mid.module';

@Module({
  imports: [ProductModule, TestModule, MidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
