import authService from '~/services/auth.service.js'
import { Request, Response, NextFunction } from 'express'
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto.js'
import { REFRESH_TOKEN_TTL } from '~/libs/tokens.js'
import sessionService from '~/services/session.service.js'

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.register(req.body as RegisterDTO)
      res.status(201).json({ message: 'User created successful', user })
    } catch (error) {
      next(error)
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await authService.signIn(req.body as LoginDTO)

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: REFRESH_TOKEN_TTL,
      })

      res.status(200).json({ message: `User ${user.displayName} is logged in`, accessToken })
    } catch (error) {
      next(error)
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken
      if (token) {
        await sessionService.logout(token)
        res.clearCookie('refreshToken')
      }
      return res.status(204)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
