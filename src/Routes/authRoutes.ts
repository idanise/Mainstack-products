import express from 'express'
const router = express.Router()
import { registerUserController } from '../Controller/AuthController'
import { userSignupValidator } from '../Validator/SignUpValidator'

router.post('/signup', userSignupValidator, registerUserController);

export default router
