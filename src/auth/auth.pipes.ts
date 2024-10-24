import { IsEmail, IsOptional, IsString, IsNotEmpty, Length, Matches, MinLength } from 'class-validator'

export class AuthCredentialsDto {
	@IsEmail({}, { message: 'Invalid email format' })
	email: string

	@IsOptional()
	@IsString()
	@MinLength(8, { message: 'password should be at least 8 characters' })
	password?: string
}

export class AuthGoogleDto {
	@IsString()
	@Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, { message: 'accessToken must be a valid JWT token' })
	@IsNotEmpty({ message: 'accessToken must not be empty' })
	accessToken: string
}

export class VerifyAccountDto {
	@IsEmail({}, { message: 'Invalid email format' })
	email: string

	@IsString()
	@IsNotEmpty({ message: 'password must not be empty' })
	@MinLength(8, { message: 'password should be at least 8 characters' })
	password: string

	@Length(6, 6, {
		message: 'verifyCode must be exactly 6 characters'
	})
	@Matches(/^\d{6}$/, { message: 'verifyCode must be exactly 6 characters of digits' })
	@IsString()
	@IsNotEmpty({ message: 'verifyCode must not be empty' })
	verifyCode: string
}

export class VerifyTokenDto {
	@IsString()
	@IsNotEmpty({ message: 'token must not be empty' })
	@Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, { message: 'accessToken must be a valid JWT token' })
	accessToken: string
}

export class RefreshTokenDto {
	@IsString()
	@IsNotEmpty({ message: 'refreshToken must not be empty' })
	@Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, { message: 'refreshToken must be a valid JWT token' })
	refreshToken: string
}