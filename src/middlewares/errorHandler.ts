import { ErrorRequestHandler } from 'express'
import { AppError } from '../utils/error.js'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('ERROR:', err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  res.status(500).json({
    message: err.message || 'Internal server error',
  })
}
