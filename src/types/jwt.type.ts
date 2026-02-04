import { JwtPayload } from 'jsonwebtoken'

export interface AccessTokenPayload extends JwtPayload {
  userId: string
}

export interface RefreshTokenPayload extends JwtPayload {
  userId: string
}
