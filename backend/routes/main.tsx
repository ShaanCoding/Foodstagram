import { Router } from 'express'
import { hello } from './hello'
import { index } from './index'

const router = Router()

router.get('/', index)
router.get('/hello/:name', hello)

export default router
