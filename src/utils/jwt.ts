import jwt from 'jsonwebtoken'
import { AccessTokenPayload, RefreshTokenPayload } from '~/types/jwt.type.js'

const ACCESS_EXPIRES_IN = '3m'
const REFRESH_EXPIRES_IN = '7d'

class JwtUtils {
  private getAccessKey(): string {
    if (!process.env.SECRET_ACCESS_KEY) {
      throw new Error('SECRET_ACCESS_KEY is not defined')
    }
    return process.env.SECRET_ACCESS_KEY
  }

  private getRefreshKey(): string {
    if (!process.env.SECRET_REFRESH_KEY) {
      throw new Error('SECRET_REFRESH_KEY is not defined')
    }
    return process.env.SECRET_REFRESH_KEY
  }

  createAccessToken(payload: AccessTokenPayload) {
    return jwt.sign(payload, this.getAccessKey(), {
      expiresIn: ACCESS_EXPIRES_IN,
    })
  }

  createRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, this.getRefreshKey(), {
      expiresIn: REFRESH_EXPIRES_IN,
    })
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, this.getAccessKey()) as AccessTokenPayload
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return jwt.verify(token, this.getRefreshKey()) as RefreshTokenPayload
  }
}

export default new JwtUtils()
