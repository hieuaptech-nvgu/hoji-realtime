import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

class HashUtils {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS)
  }

  async comparePassword(password: string, hashedPassord: string) {
    return await bcrypt.compare(password, hashedPassord)
  }
}

export default new HashUtils()
