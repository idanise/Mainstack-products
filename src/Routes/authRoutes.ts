const express = require('express')
const router = express.Router()
import { userSignupValidator } from '../Validator/SignUpValidator'
import { loginUser, registerUser } from '../Services/AuthService'

router.post('/signup', userSignupValidator, registerUser);
router.post('/login', loginUser); 

export default router
