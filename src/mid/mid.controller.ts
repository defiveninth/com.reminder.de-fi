import { Controller, Get } from '@nestjs/common';
import { MidService } from './mid.service';

@Controller('mid')
export class MidController {
  constructor(private readonly midService: MidService) {}

  @Get()
  getHello(): string {
    return 'hello world';
  }
}
