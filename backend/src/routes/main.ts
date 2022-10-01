import formData from "express-form-data"
import Router from 'express-promise-router'
import { body, validationResult } from 'express-validator'

import { Hello } from './hello'
import { Index } from './index'
import { Login } from './login'
import { Post } from './post'
import { Register } from './register'
import { Profile } from './profile'
import { EditProfile } from './editprofile'
import { AuthenticateUser } from '../util/auth'
import { Me } from './me'

const router = Router()
router.use(formData.format())
router.use(formData.parse())
router.use(formData.stream())
router.use(formData.union())

router.get('/', Index)
router.get('/hello/:name', Hello)

router.post(
	'/register',
	body('email').isEmail(),
	body('fullName').isLength({ min: 5, max: 120 }),
	body('username').isLength({ min: 5, max: 80 }),
	body('password').isStrongPassword(),
	Register
)

router.post(
	'/posts',
	// body('picture').isLength({ min: 5 }),
	// body('caption').isLength({ min: 5 }),
	// body('location').isLength({ min: 5 }),
	Post
)

router.get('/me', AuthenticateUser, Me)

router.post('/login', body('email').isEmail(), body('password'), Login)

router.get('/profile', Profile)

router.post(
	'/editprofile',
	body('email').isEmail(),
	body('fullName').isLength({ min: 5, max: 120 }),
	body('bio').isLength({ min: 5, max: 200 }),
	body('username').isLength({ min: 5, max: 80 }),
	body('phone').isLength({ min: 2, max: 15 }),
	AuthenticateUser,
	EditProfile
)

export default router
