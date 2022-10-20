import { json, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'
// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// REPLACE 13 WITH LOGGED IN ACCOUNT ID

const getUserCategoriesQuery = `SELECT DISTINCT categories FROM posts WHERE account_id = ?`

async function GetCategories(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const account = req.account
	
	if (account === undefined) {
		return res.status(500)
	} else {
        let categories = await Query(getUserCategoriesQuery, [account.account_id.toString()]) as any;
		categories = categories.map((item: any) => item.categories).filter((item: any) => item != "" && item != null && item != undefined);
		
        if(categories.length > 0){
            return res.status(200).json({
                categories
            });
		} else {
			return res.json({ message: 'No categories yet' })
		}
	}
}

export { GetCategories }