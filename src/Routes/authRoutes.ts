import express from 'express'
const router = express.Router()
import { userSignupValidator } from '../Validator/SignUpValidator'
import { loginUser, registerUser } from '../Services/AuthService'

router.post('/signup', userSignupValidator, loginUser);
router.post('/login', registerUser); 

export default router
