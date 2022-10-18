import express from 'express'
import request  from 'supertest'

import Router from '../main'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Hello Route Handler', function () {
	test('Responds to /hello', async () => {
		const res = await request(app).get('/hello')
		expect(res.statusCode).toBe(200)
		expect(res.text).toEqual('hello world!')
	})

	test('Responds to /hello/Jack', async () => {
		const res = await request(app).get('/hello/Jack')
		expect(res.statusCode).toBe(200)
		expect(res.text).toEqual('hello Jack!')
	})
})
