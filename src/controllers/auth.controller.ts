import authService from '~/services/auth.service.js'
import { Request, Response, NextFunction } from 'express'
import { RegisterDTO } from '../dtos/auth.dto.js'

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.register(req.body as RegisterDTO)
      res.status(201).json({ message: 'User created successful', user })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
