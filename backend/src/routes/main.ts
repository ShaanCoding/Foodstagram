import formData from "express-form-data"
import Router from 'express-promise-router'
import { body, validationResult } from 'express-validator'

import { AuthenticateUser } from '../util/auth'
import { EditProfile } from './editprofile'
import { Hello } from './hello'
import { Index } from './index'
import { Login } from './login'
import { Me } from './me'
import { Post } from './post'
import { Profile } from './profile'
import { Register } from './register'
import { GetAllUsers, SearchUsers } from './searchUser'
import { GetAllPosts, SearchPosts } from './searchPost'
import { PostCount } from './postCount'
import { FollowerCount } from './followerCount'
import { FollowingCount } from './followingCount'

const router = Router()
router.use(formData.format())
router.use(formData.parse())
router.use(formData.stream())
router.use(formData.union())

router.get('/', Index)
//router.get('/*', GetAllPosts)
router.get('/getallusers', GetAllUsers)

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
	body('picture').isLength({ min: 5 }),
	body('caption').isLength({ min: 5 }),
	body('location').isLength({ min: 5 }),
	Post
)

router.get('/me', AuthenticateUser, Me)

router.post('/login', body('email').isEmail(), body('password'), Login)

router.get('/profile', Profile)

router.get('/postCount', PostCount)
router.get('/followerCount', FollowerCount)
router.get('/followingCount', FollowingCount)

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

router.get('/api/search_user', SearchUsers)
router.get('/search_post', SearchPosts)

export default router
