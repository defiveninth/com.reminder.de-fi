import { Module } from '@nestjs/common'
import { MidService } from './mid.service'
import { MidController } from './mid.controller'

@Module({
  controllers: [MidController],
  providers: [MidService],
})
export class MidModule {

}
