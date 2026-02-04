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
}

export default new SessionService()
