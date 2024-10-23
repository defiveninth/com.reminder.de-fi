import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { TestService } from './test.service'
import { SignInDto } from './sign-in.dto'

@Controller('pipes')
export class TestController {
  constructor(private readonly testService: TestService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(
    @Body() credentials: SignInDto
  ) {
    return credentials
  }
}
