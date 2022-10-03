const request = require('supertest')
import express from 'express'
import { Query } from '../../util/db'
import Router from '../main'
import { GenerateAccessToken } from '../../util/auth'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Follow Route Handler', function () {
	test('Account that exists successfully follows or unfollows an account that exists, based on the current follow relationship that exists from one user to another', async () => {
		const authToken = await GenerateAccessToken(18, '', '')
		const res = await request(app)
			.post('/follow')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({ account_to_follow: 12, account_id: 18 })
		expect(res.statusCode).toBe(200)
		expect(JSON.parse(res.text)).toHaveProperty('message')
		expect(JSON.parse(res.text).message).toContain(
			'Account '
		)
		expect(JSON.parse(res.text).message).toContain(
			'followed.'
		)
		// Reverse action
		if (JSON.parse(res.text).message === "Account followed.") {
			console.log("Reversing the follow...")
			await Query('DELETE FROM account_followers WHERE account_id = ? AND followed_account_id = ?', ['18', '12'])
		}
		else if (JSON.parse(res.text).message === "Account unfollowed.") {
			console.log("Reversing the unfollow...")
			await Query('INSERT INTO account_followers VALUES (?, ?)', ['18', '12'])
		}
	})

	test('Account that exists fails to follow an account that does not exist', async () => {
		const authToken = await GenerateAccessToken(18, '', '')
		const res = await request(app)
			.post('/follow')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({ account_to_follow: 1354378, account_id: 16 })
		expect(res.statusCode).toBe(500)
		expect(JSON.parse(res.text)).toHaveProperty('message')
		expect(JSON.parse(res.text).message).toBe(
			'Error occurred.'
		)
	})
})
