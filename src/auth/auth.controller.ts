import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('credentials')
  async authWithCredentials(@Body() body: { email: string; password?: string }) {
    const { email, password } = body

    if (email && password) {
      const tokens = await this.authService.signInCredentials(email, password)
      if (tokens) {
        return tokens
      } else {
        throw new UnauthorizedException('Invalid credentials')
      }
    }

    if (email && !password) {
      const message = this.authService.CreateNotVerifiedUser(email)
      return { message }
    }

    throw new UnauthorizedException('Invalid request')
  }

  @Post('credentials')
  async verifyUser(@Body() body: { email: string; password: string, verifyCode: string }) {
    const { email, password, verifyCode } = body

    if (email && password && verifyCode) {
      const tokens = await this.authService.verifyUser(email, password, verifyCode)
      if (tokens) {
        return tokens
      } else {
        throw new UnauthorizedException('Invalid credentials')
      }
    }

    throw new UnauthorizedException('Invalid request')
  }

  @Post('google')
  async authWithGoogle(@Body() body: { accessToken: string }) {
    const { accessToken } = body

    if (accessToken) {
      // const tokens = await this.authService.validateUser()
      // if (tokens) {
      //   return tokens
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  @Post('token/verify')
  verifyToken(@Body() body: { accessToken: string }) {
    return this.authService.verifyToken(body.accessToken)
  }

  @Post('token/refresh')
  refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshAccessToken(body.refreshToken)
  }

  @Get()
  getUsers() {
    return this.authService.getUsers()
  }
}
