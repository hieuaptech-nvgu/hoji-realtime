import express from 'express'
const router = express.Router()
import userController from '~/controllers/user.controller.js'

router.get('/me', userController.authMe)

export default router
