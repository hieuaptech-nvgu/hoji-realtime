import Session from '~/models/Session.js'
import { CreateSessionDTO } from '~/types/session.type.js'

class SessionRepository {
  create(data: CreateSessionDTO) {
    return Session.create(data)
  }

  findByRefreshToken(token: string) {
    return Session.findOne({ refreshToken: token })
  }

  deleteByRefreshToken(token: string) {
    return Session.deleteOne({ refreshToken: token })
  }

  deleteByUserId(userId: string) {
    return Session.deleteMany({ userId })
  }
}

export default new SessionRepository()
