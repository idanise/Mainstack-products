import express from 'express'
const router = express.Router()
import { registerUserController } from '../Controller/AuthController'

router.post('/signup', registerUserController)

export default router
