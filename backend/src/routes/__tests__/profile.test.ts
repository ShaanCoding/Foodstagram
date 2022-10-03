const request = require('supertest')
import express from 'express'
import Router from '../main'
import { GenerateAccessToken } from '../../util/auth'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Profile Route Handler', function () {
    test('Checks the details of an existing account', async () => {
        const authToken = await GenerateAccessToken(2, '', '')
        const res = await request(app)
            .get('/profile/admin')
            .set({ Authorization: `Bearer ${authToken}` })
        expect(res.statusCode).toBe(200)
        console.log(JSON.parse(res.text))
        expect(JSON.parse(res.text).data).toHaveProperty('email')
        expect(JSON.parse(res.text).data.verified).toBe(1)
    })
})