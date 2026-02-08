import authService from '~/services/auth.service.js'
import { Request, Response, NextFunction } from 'express'
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto.js'
import sessionService from '~/services/session.service.js'
import { REFRESH_TOKEN_TTL } from '~/libs/tokens.js'
import ms from 'ms'

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
        maxAge: ms(REFRESH_TOKEN_TTL),
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
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken
      if (!token) {
        return res.status(401).json({ message: 'Token not found' })
      }
      const accessToken = await sessionService.refreshToken(token)
      res.status(200).json({ accessToken })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
