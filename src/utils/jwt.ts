import jwt from 'jsonwebtoken'
import { AccessTokenPayload, RefreshTokenPayload } from '~/types/jwt.type.js'
import {ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL} from '../libs/tokens.js'

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
      expiresIn: ACCESS_TOKEN_TTL,
    })
  }

  createRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, this.getRefreshKey(), {
      expiresIn: REFRESH_TOKEN_TTL,
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
