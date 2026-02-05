import express from 'express'
const router = express.Router()
import authController from '~/controllers/auth.controller.js'

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)
router.post('/refresh-token', authController.refreshToken)

export default router
