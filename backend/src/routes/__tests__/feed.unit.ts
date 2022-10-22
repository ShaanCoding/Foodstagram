const request = require('supertest')
import express from 'express'
import Router from '../main'
import { GenerateAccessToken } from '../../util/auth'
import { Query } from '../../util/db'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Feed Route Handler', function () {
	test.skip('Account that follows at least 1 user with posts pulls all posts from those user(s)', async () => {
		const authToken = await GenerateAccessToken(2, '', '')
		const res = await request(app)
			.get('/feed')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({ account_id: 2 })
		expect(JSON.parse(res.text).posts.length).toBeGreaterThan(0)
		expect(res.statusCode).toBe(200)
	})

	test.skip('Account follows accounts that have no posts, so it does not pull any posts', async () => {
		const authToken = await GenerateAccessToken(16, '', '')
		const res = await request(app)
			.get('/feed')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({ account_id: 16 })
		expect(JSON.parse(res.text)).toHaveProperty('message')
		expect(JSON.parse(res.text).message).toBe(
			'No posts yet'
		)
	})

	test.skip('Account does not follow any accounts, so it does not pull any posts', async () => {
		const authToken = await GenerateAccessToken(12, '', '')
		const res = await request(app)
			.get('/feed')
			.set({ Authorization: `Bearer ${authToken}` })
			.send({ account_id: 12 })
		expect(JSON.parse(res.text)).toHaveProperty('message')
		expect(JSON.parse(res.text).message).toBe(
			'No posts yet'
		)
	})
})
