import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'

const GetCommentsQuery = `
SELECT * FROM comments WHERE post_id = ?
`