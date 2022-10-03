const request = require('supertest')
import express from 'express'
import { Query } from '../../util/db'
import Router from '../main'

const app = express()
app.use(express.json())
app.use('/', Router)

describe('The Search Route Handler', function () {
  test('Search for an existing user/profile', async () => {
    const res = await request(app)
      .post('/api/search_user')
      .send({ searchStr: 'admin'})
      .set('Accept', 'application/json')
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.text)).toHaveProperty('message')
    expect(JSON.parse(res.text)).toHaveProperty('data')
    expect(JSON.parse(res.text).message).toBe('User / Profile matches found!')
  })

  test('Search for an existing post/location', async () => {
    const res = await request(app)
      .post('/api/search_post')
      .send({ searchStr: 'sydney'})
      .set('Accept', 'application/json')
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.text)).toHaveProperty('message')
    expect(JSON.parse(res.text)).toHaveProperty('data')
    expect(JSON.parse(res.text).message).toBe('Post / Location matches found!')
  })

  test('Search for user/profile that does not exists', async () => {
    const res = await request(app)
      .post('/api/search_user')
      .send({ searchStr: 'notanadminthisisnotanadmin'})
      .set('Accept', 'application/json')
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.text)).toHaveProperty('message')
    expect(JSON.parse(res.text).message).toBe('No results')
  })

  test('Search for post/location that does not exists',async () => {
    const res = await request(app)
      .post('/api/search_post')
      .send({ searchStr: 'zimbabwe'})
      .set('Accept', 'application/json')
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.text)).toHaveProperty('message')
    expect(JSON.parse(res.text).message).toBe('No results')
  })
})