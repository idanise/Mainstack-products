import express from 'express'
const router = express.Router()
import { registerUserController, loginUserController } from '../Controller/AuthController'
import { userSignupValidator } from '../Validator/SignUpValidator'

router.post('/signup', userSignupValidator, registerUserController);
router.post('/login', loginUserController); 

export default router
