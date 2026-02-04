import jwt from 'jsonwebtoken'
import { AccessTokenPayload, RefreshTokenPayload } from '~/types/jwt.type.js'
import { JWT_CONFIG } from '~/libs/config.js'

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
      expiresIn: JWT_CONFIG.ACCESS_EXPIRES,
    })
  }

  createRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, this.getRefreshKey(), {
      expiresIn: JWT_CONFIG.REFRESH_EXPIRES,
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
