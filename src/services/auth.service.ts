import authRepository from '~/repositories/auth.repository.js'
import JwtUtils from '../utils/jwt.js'
import HashUtils from '../utils/hash.js'
import { AppError } from '~/utils/error.js'
import sessionService from './session.service.js'
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto.js'
import { REFRESH_TOKEN_TTL } from '~/libs/tokens.js'
import ms from 'ms'

class AuthService {
  async register(data: RegisterDTO) {
    const { email, username, password, displayName } = data

    const existsUser = await authRepository.findByEmailOrUsername(email, username)
    if (existsUser) {
      throw new AppError('User already exists', 409)
    }

    const hashedPassword = await HashUtils.hashPassword(password)

    const newUser = await authRepository.create({
      email,
      username,
      hashedPassword,
      displayName,
    })

    return {
      newUser,
    }
  }

  async signIn(data: LoginDTO) {
    const { username, password } = data
    const user = await authRepository.findByUserName(username)
    if (!user) {
      throw new AppError('Wrong username or password', 401)
    }
    const isMatch = await HashUtils.comparePassword(password, user.hashedPassword)
    if (!isMatch) {
      throw new AppError('Wrong username or password', 401)
    }

    const accessToken = await JwtUtils.createAccessToken({ userId: user._id.toString() })
    const refreshToken = await JwtUtils.createRefreshToken({ userId: user._id.toString() })

    await sessionService.deleteSession(user._id.toString())

    await sessionService.createSession({
      userId: user._id.toString(),
      refreshToken,
      expiredAt: new Date(Date.now() + ms(REFRESH_TOKEN_TTL)),
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}

export default new AuthService()
