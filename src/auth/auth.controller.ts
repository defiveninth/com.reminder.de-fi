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

    const userStatus = await this.authService.isExistUserWithEmail(email)

    if (!userStatus.isExists) {
      return this.authService.CreateNotVerifiedUser(email)
    }

    if (!password) {
      if (userStatus.isVerified) {
        return {
          message: 'MP400'
        }
      } else {
        return {
          message: 'MV400'
        }
      }
    }

    const tokens = await this.authService.signInCredentials(email, password)

    if (tokens) {
      return tokens
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
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
    console.log(accessToken)

    const tokens = await this.authService.authWithGoogle(accessToken)
    return tokens
    // throw new UnauthorizedException('Invalid credentials')
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

  @Post('drop-table')
  dropTable() {
    return this.authService.dropTable()
  }
}
