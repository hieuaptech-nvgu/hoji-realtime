import jwt, { JwtPayload } from 'jsonwebtoken'

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY
const SECRET_REFRESH_KEY = process.env.SECRET_REFRESH_KEY
const ACCESS_EXPIRES_IN = '3m'
const REFRESH_EXPIRES_IN = '7d'

class JwtUtils {
  private getAccessKey() {
    if (!SECRET_ACCESS_KEY) throw new Error('Access key not found')
    return SECRET_ACCESS_KEY
  }
  private getRefreshKey() {
    if (!SECRET_REFRESH_KEY) throw new Error('Refresh key not found')
    return SECRET_REFRESH_KEY
  }
  createAccessToken(payload: JwtPayload | string) {
    return jwt.sign(payload, this.getAccessKey(), {
      expiresIn: ACCESS_EXPIRES_IN,
    })
  }
  createRefreshToken(payload: JwtPayload | string) {
    return jwt.sign(payload, this.getRefreshKey(), {
      expiresIn: REFRESH_EXPIRES_IN,
    })
  }
  verifyAccessToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.getAccessKey())
  }
  verifyRefreshToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.getRefreshKey())
  }
}

export default new JwtUtils()
