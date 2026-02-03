import User from '../models/User.js'
import { IUser } from '../types/user.type.js'

class AuthRepository {
  findByEmail(email: string) {
    return User.findOne({ email })
  }

  findByUserName(username: string) {
    return User.findOne({ username })
  }

  findByEmailOrUsername(email: string, username: string) {
    return User.findOne({
      $or: [{ email }, { username }],
    })
  }

  findById(id: string) {
    return User.findById(id)
  }

  create(data: Pick<IUser, 'email' | 'username' | 'hashedPassword' | 'displayName'>) {
    return User.create(data)
  }
}

export default new AuthRepository()
