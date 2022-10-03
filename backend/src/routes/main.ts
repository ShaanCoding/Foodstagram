import formData from "express-form-data"
import Router from 'express-promise-router'
import { body, param, validationResult } from 'express-validator'

import { AuthenticateUser } from '../util/auth'
import { EditProfile } from './editprofile'
import { Feed } from "./feed"
import { FollowerCount } from './followerCount'
import { FollowingCount } from './followingCount'
import { Hello } from './hello'
import { Index } from './index'
import { Login } from './login'
import { Me } from './me'
import { CreatePost, DeletePost, UpdatePost } from './post'
import { PostCount } from './postCount'
import { Profile } from './profile'
import { Register } from './register'
import { GetAllPosts, SearchPosts } from './searchPost'
import { GetAllUsers, SearchUsers } from './searchUser'

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

router.get(
	'/feed',
	AuthenticateUser,
	Feed,
)

router.post(
	'/posts',
	body('picture').isLength({ min: 5 }),
	body('caption').isLength({ min: 5 }),
	body('location').isLength({ min: 5 }),
	CreatePost
)
router.put(
	'/posts/:post_id',
	param('post_id').isNumeric(),
	body('caption').isLength({ min: 5 }),
	body('location').isLength({ min: 5 }),
	AuthenticateUser,
	UpdatePost,
)
router.delete(
	'/posts/:post_id',
	param('post_id').isNumeric(),
	AuthenticateUser,
	DeletePost,
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
