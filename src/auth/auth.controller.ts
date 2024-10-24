import { Controller, Post, Body, UnauthorizedException, Get, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto, AuthGoogleDto, VerifyAccountDto } from './auth.pipes'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('credentials')
  @UsePipes(ValidationPipe)
  async authWithCredentials(@Body() body: AuthCredentialsDto) {
    const { email, password } = body

    if (password) {
      const tokens = await this.authService.signInCredentials(email, password)
      if (tokens) {
        return tokens
      } else {
        throw new UnauthorizedException('Invalid credentials')
      }
    }

    if (email && !password) {
      return this.authService.CreateNotVerifiedUser(email)
    }

    throw new UnauthorizedException('Invalid request')
  }

  @Post('verify')
  @UsePipes(ValidationPipe)
  async verifyUser(@Body() body: VerifyAccountDto) {
    const { email, password, verifyCode } = body

    const tokens = await this.authService.verifyUser(email, password, verifyCode)
    if (tokens) {
      return tokens
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  @Post('google')
  @UsePipes(ValidationPipe)
  async authWithGoogle(@Body() body: AuthGoogleDto) {
    const { accessToken } = body

    // const tokens = await this.authService.authWithGoogle()
    // return tokens
    throw new UnauthorizedException('Invalid credentials')
  }

  @Post('token/verify')
  @UsePipes(ValidationPipe)
  verifyToken(@Body() body: AuthGoogleDto) {
    return this.authService.verifyToken(body.accessToken)
  }

  @Post('token/refresh')
  @UsePipes(ValidationPipe)
  refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshAccessToken(body.refreshToken)
  }

  @Get()
  getUsers() {
    return this.authService.getUsers()
  }
}
