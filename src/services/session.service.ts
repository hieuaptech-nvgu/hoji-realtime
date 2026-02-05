import sessionRepository from '~/repositories/session.repository.js'
import { AppError } from '~/utils/error.js'
import JwtUtils from '../utils/jwt.js'
import { CreateSessionDTO } from '~/types/session.type.js'


class SessionService {
  async createSession(data: CreateSessionDTO) {
    return sessionRepository.create(data)
  }

  async logout(refreshToken: string) {
    await sessionRepository.deleteByRefreshToken(refreshToken)
  }

  async deleteSession(userId: string) {
    await sessionRepository.deleteByUserId(userId)
  }

  async refreshToken(token: string) {
    let payload
    try {
      payload = JwtUtils.verifyRefreshToken(token)
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 403)
    }

    const session = await sessionRepository.findByRefreshToken(token)

    if (!session) {
      throw new AppError('Invalid or expired refresh token', 403)
    }

    if (payload.userId !== session.userId.toString()) {
      throw new AppError('Invalid refresh token', 403)
    }

    if (session.expiredAt < new Date()) {
      throw new AppError('token has expired', 403)
    }

    const accessToken = JwtUtils.createAccessToken({ userId: session.userId.toString() })

    return accessToken
  }
}

export default new SessionService()
