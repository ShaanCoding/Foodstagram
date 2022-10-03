const request = require('supertest')

import express from 'express'

import { GenerateAccessToken } from '../../util/auth'
import Router from '../main'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Post Route Handler', function () {
    test('CreatePost when logged in', async () => {
        await Promise
        .resolve()
        .then(() => GenerateAccessToken(2, '', ''))
        .then(authToken => request(app)
            .post('/posts')
            .send({ picture: "this is a test picture", caption: "this is a test caption", location: "this is a test location" })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(201));
    })

    test('CreatePost when not logged in', async () => {
        await Promise
        .resolve()
        .then(() => request(app)
            .post('/posts')
            .send({ picture: "this is a picture", caption: "this is a caption", location: "this is a location" })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(401));
    })

    // TODO: create post first, then run the test to delete it
    test.skip('DeletePost own post when logged in', async () => {
        await Promise
        .resolve()
        .then(() => GenerateAccessToken(2, '', '')) // user # 2 owns post # 1 => success
        .then(authToken => request(app)
            .delete('/posts/1')
            .send({ })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(204));
    })

    test('DeletePost someone else\'s post when logged in', async () => {
        await Promise
        .resolve()
        .then(() => GenerateAccessToken(2, '', '')) // user # 2 does not own post # 2 => failure
        .then(authToken => request(app)
            .delete('/posts/2')
            .send({ })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(500));
    })

    test('DeletePost when not logged in', async () => {
        await Promise
        .resolve()
        .then(() => request(app)
            .delete('/posts/1')
            .send({ })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(401));
    })

})