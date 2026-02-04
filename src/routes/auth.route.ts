import express from 'express'
const router = express.Router()
import authController from '~/controllers/auth.controller.js'

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)

export default router
