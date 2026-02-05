import JwtUtils from '../utils/jwt.js'
import { Request, Response, NextFunction } from 'express'
import UserRepository from '../repositories/user.repository.js'

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token is required' })
    }

    const token = authHeader.split(' ')[1]

    let decoded
    try {
      decoded = JwtUtils.verifyAccessToken(token)
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' })
    }

    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token payload' })
    }

    const user = await UserRepository.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
