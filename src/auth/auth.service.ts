import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { genSalt, hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { User, Prisma } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prismaService: PrismaService,
	) { }

	async signInCredentials(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
		const user = await this.prismaService.user.findFirst({
			where: { email },
		})

		if (!user || !(await this.comparePassword(password, user.passwordHash))) {
			throw new UnauthorizedException('Invalid email or password')
		}

		const payload = this.generatePayload(user)
		const accessToken = this.jwtService.sign(payload, { expiresIn: '2h' })
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' })

		await this.prismaService.user.update({
			where: { email: user.email },
			data: { refreshToken },
		})

		return { accessToken, refreshToken }
	}

	async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
		const user = await this.prismaService.user.findFirst({
			where: { refreshToken },
		})

		if (!user) {
			throw new UnauthorizedException('Invalid refresh token')
		}

		try {
			const payload = this.jwtService.verify(refreshToken)
			const newAccessToken = this.jwtService.sign({ email: payload.email, sub: payload.sub }, { expiresIn: '2h' })
			return { accessToken: newAccessToken }
		} catch (error) {
			throw new UnauthorizedException('Invalid or expired refresh token')
		}
	}

	async verifyUser(email: string, password: string, verifyCode: string) {
		const user = await this.prismaService.user.findFirst({
			where: { email }
		})

		if (user) {
			if (user.verifyCode === verifyCode) {
				const hashedPassword = await hash(password, 10)
				await this.prismaService.user.update({
					where: { email },
					data: { passwordHash: hashedPassword, verifyCode: null },
				})
				const payload = this.generatePayload(user)
				const { accessToken, refreshToken } = this.generateTokens(payload)

				await this.prismaService.user.update({
					where: { email: user.email },
					data: { refreshToken },
				})

				return { accessToken, refreshToken }
			}
		} else {
			throw new UnauthorizedException('User not found')
		}
	}

	private generateTokens(payload: Record<string, any>) {
		const accessToken = this.jwtService.sign(payload, { expiresIn: '2h' })
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' })

		return { accessToken, refreshToken }
	}

	async CreateNotVerifiedUser(email: string) {
		const existingUser = await this.prismaService.user.findFirst({
			where: { email }
		})

		if (existingUser) {
			throw new BadRequestException('User with this email already exists')
		}

		const newUser = await this.prismaService.user.create({
			data: {
				email,
				verifyCode: this.generateVerificationCode(),
				settings: {
					create: {}
				},
				devices: {
					create: {}
				}
			},
			include: {
				settings: true,
				devices: true,
			}
		})

		return newUser


	}

	getUsers(): Promise<User[]> {
		return this.prismaService.user.findMany()
	}

	verifyToken(accessToken: string): Record<string, any> {
		try {
			const payload = this.jwtService.verify(accessToken)
			return payload
		} catch (error) {
			throw new UnauthorizedException('Token verification failed')
		}
	}

	private generateVerificationCode(): string {
		return Math.floor(100000 + Math.random() * 900000).toString()
	}

	private generatePayload(user: User): Record<string, any> {
		return {
			sub: user.id,
			email: user.email,
			profilePicture: user.profilePicture,
			lastName: user.lastName,
			firstName: user.firstName,
			phoneNumber: user.phoneNumber,
			birthdate: user.birthdate,
			telegramId: user.telegramId,
		}
	}

	private async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
		return await compare(inputPassword, hashedPassword)
	}

	private async hashPassword(password: string): Promise<string> {
		const salt = await genSalt(10)
		return await hash(password, salt)
	}
}
