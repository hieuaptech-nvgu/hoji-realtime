import { Request, Response, NextFunction } from 'express'

class UserController {
  async authMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user
      res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
