const request = require('supertest')
import express from 'express'
import Router from '../main'
import { GenerateAccessToken } from '../../util/auth'
import { Query } from '../../util/db'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Block Route Handler', function () {
	test('Account that exists successfully blocks or unblocks an account that exists, based on the current block relationship that exists from one user to another', async () => {
		const authToken = await GenerateAccessToken(5, '', '')
		const res = await request(app)
			.post('/block')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({ account_to_block: 10, account_id: 5 })
		expect(res.statusCode).toBe(200)
		expect(JSON.parse(res.text)).toHaveProperty('message')
		expect(JSON.parse(res.text).message).toContain(
			'Account '
		)
		expect(JSON.parse(res.text).message).toContain(
			'blocked.'
		)
		// Reverse action
		if (JSON.parse(res.text).message === "Account blocked.") {
			console.log("Reversing the block...")
			await Query('DELETE FROM account_blocks WHERE account_id = ? AND blocked_account_id = ?', ['5', '10'])
		}
		else if (JSON.parse(res.text).message === "Account unblocked.") {
			console.log("Reversing the unblock...")
			await Query('INSERT INTO account_blocks VALUES (?, ?)', ['5', '10'])
		}
	})
})
