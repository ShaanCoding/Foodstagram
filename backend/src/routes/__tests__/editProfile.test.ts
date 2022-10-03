const request = require('supertest')
import express from 'express'
import Router from '../main'
import { GenerateAccessToken } from '../../util/auth'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Edit Profile Route Handler', function () {
	test('Updated the phone number field for an existing account', async () => {
		const authToken = await GenerateAccessToken(2, '', '')
		const res = await request(app)
			.post('/editprofile/admin')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({
				fullName: 'Admin',
				username: 'admin',
				bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
				email: 'admin@uts.com',
				password: 'Admin123!',
				phone: '123456'
			})
		expect(res.statusCode).toBe(201)
	})
})
