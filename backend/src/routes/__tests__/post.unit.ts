const request = require('supertest')

import express from 'express'

import Router from '../main'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Post Route Handler', function () {
    test('CreatePost when logged in', async () => {
        await Promise
        .resolve()
        .then(() => request(app)
            .post('/login')
            .send({ email: 'test@uts.com', password: 'testPassword' })
            .set('Accept', 'application/json'))
        .then(() => request(app)
            .post('/posts')
            .send({ picture: "this is a picture", caption: "this is a caption", location: "this is a location" })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(200));
    })

    // test('CreatePost when not logged in', async () => {})

})