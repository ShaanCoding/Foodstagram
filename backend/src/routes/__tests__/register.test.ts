const request = require('supertest')
import express from 'express'
import { Query } from '../../util/db'
import Router from '../main'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Register Route Handler', function () {
	afterAll(async () => {
		// Cleanup test data
		await Query('DELETE FROM accounts WHERE email = ?', [
			'registerTestUser@uts.com',
		])
	})

	test('Creates a new account with valid details', async () => {
		const res = await request(app)
			.post('/register')
			.send({
				fullName: 'Test Account Name',
				username: 'Unique Test Account Name',
				email: 'registerTestUser@uts.com',
				password: 'ComplexP!123',
			})
			.set('Accept', 'application/json')
		expect(res.statusCode).toBe(201)
		expect(JSON.parse(res.text)).toHaveProperty('message')
		expect(JSON.parse(res.text).message).toBe('Successfully created account!')
	})
})
