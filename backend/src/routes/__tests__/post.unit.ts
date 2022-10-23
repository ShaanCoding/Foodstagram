import express from 'express'
import request  from 'supertest'

import { GenerateAccessToken } from '../../util/auth'
import Router from '../main'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Post Route Handler', function () {
    test.skip('CreatePost when logged in', async () => {
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

    test.skip('CreatePost when not logged in', async () => {
        await Promise
        .resolve()
        .then(() => request(app)
            .post('/posts')
            .send({ picture: "this is a picture", caption: "this is a caption", location: "this is a location" })
            .set('Accept', 'application/json'))
        .then(res => expect(res.statusCode).toBe(401));
    })

    test('DeletePost own post when logged in', async () => {
        let authToken: string;

        await Promise
        .resolve()
        .then(() => authToken = GenerateAccessToken(2, '', ''))
        .then(() => request(app) // creates the post
            .post('/posts')
            .send({ picture: "this is a picture", caption: "this is a caption", location: "this is a location" })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        .then(res => request(app) // deletes the post
            .delete(`/posts/${res.body.inserted_id}`)
            .send({ })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        //.then(res => expect(res.statusCode).toBe(204));
    })

    test('DeletePost someone else\'s post when logged in', async () => {
        let authToken: string;

        await Promise
        .resolve()
        .then(() => authToken = GenerateAccessToken(2, '', '')) // user 2 logs in
        .then(() => request(app) // user 2 creates a post
            .post('/posts')
            .send({ picture: "this is a picture", caption: "this is a caption", location: "this is a location" })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        .then(res => void (authToken = GenerateAccessToken(1, '', '')) || res) // user 3 logs in
        .then(res => request(app) // user 3 tries to delete user 2's post
            .delete(`/posts/${res.body.inserted_id}`)
            .send({ })
            .set({ Authorization: `Bearer ${authToken}` })
            .set('Accept', 'application/json'))
        //.then(res => expect(res.statusCode).toBe(500));
    })

    test.skip('DeletePost when not logged in', async () => {
        await Promise
        .resolve()
        .then(() => request(app)
            .delete('/posts/1')
            .send({ })
            .set('Accept', 'application/json'))
        //.then(res => expect(res.statusCode).toBe(401));
    })

})