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
import { SearchUsers, SearchPosts } from './search'
import { PostCount } from './postCount'
import { FollowerCount } from './followerCount'
import { FollowingCount } from './followingCount'
import { ProfilePosts } from './profilePosts'
import { GetPosts } from './feed'
import { Follow } from './follow'
import { ProfilePic } from './profilePic'

const router = Router()

router.get('/', Index)
//router.get('/*', GetAllPosts)

router.get('/hello', Hello)
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
	'/post',
	body('picture').isLength({ min: 5 }),
	body('caption').isLength({ min: 5 }),
	body('location').isLength({ min: 5 }),
	Post
)

router.get('/me', AuthenticateUser, Me)

router.post('/login', body('email').isEmail(), body('password'), Login)

router.get('/profile/:username', Profile)
router.get('/postCount/:profileID', PostCount)
router.get('/followerCount/:profileID', FollowerCount)
router.get('/followingCount/:profileID', FollowingCount)
router.get('/profilePosts/:profileID', AuthenticateUser, ProfilePosts)

router.post(
	'/editprofile/:profileID',
	body('email').isEmail(),
	body('fullName').isLength({ min: 5, max: 120 }),
	body('bio').isLength({ min: 5, max: 200 }),
	body('username').isLength({ min: 5, max: 80 }),
	body('phone').isLength({ min: 2, max: 15 }),
	AuthenticateUser,
	EditProfile
)

router.post(
	'/profilePic/:profileID',
	body('picture').isLength({ min: 5 }),
	ProfilePic
)

//search routes
router.post('/api/search_user', body('searchStr'), SearchUsers)
router.post('/api/search_post', body('searchStr'), SearchPosts)
//end search routes

router.get('/feed', AuthenticateUser, GetPosts)
router.post('/follow', body('account_to_follow'), Follow)

export default router
