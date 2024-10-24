import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator'

export class AuthCredentialsDto {
	@IsEmail({}, { message: 'Invalid email format' })
	email: string

	@IsOptional()
	@IsString()
	password?: string
}

export class AuthGoogleDto {
	// to be checked
	@IsString()
	@IsNotEmpty({ message: 'accessToken must not be empty' })
	accessToken: string
}

export class VerifyAccountDto {
	@IsEmail({}, { message: 'Invalid email format' })
	email: string

	@IsString()
	@IsNotEmpty({ message: 'password must not be empty' })
	password: string

	// to be fixed
	@IsString()
	@IsNotEmpty({ message: 'verifyCode must not be empty' })
	verifyCode: string
}

export class VerifyTokenDto {
	@IsString()
	@IsNotEmpty({ message: 'token must not be empty' })
	accessToken: string
}

export class RefreshTokenDto {
	@IsString()
	@IsNotEmpty({ message: 'refreshToken must not be empty' })
	refreshToken: string
}