import User from '~/models/User.js'
import { IUser } from '~/types/user.type.js'

class UserRepository {
  create(user: IUser) {
    return User.create(user)
  }

  findById(id: string) {
    return User.findById(id)
  }
}

export default new UserRepository()
