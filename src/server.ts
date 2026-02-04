import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { connectDB } from './libs/db.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import { protectedRoute } from './middlewares/auth.middleware.js'

const app = express()
const PORT = process.env.PORT || 5001

//middlewares
app.use(express.json())
app.use(cookieParser())

//public routes
app.use('/api/auth', authRoute)

//private routes
app.use(protectedRoute)
app.use('/api/users', userRoute)

//error handler
app.use(errorHandler)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
  })
})
