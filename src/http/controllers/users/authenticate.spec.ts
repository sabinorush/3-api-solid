import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be abe to register', async () => {

    await request(app.server)
      .post('/users')
      .send({
        name: 'fulano da silva',
        email: 'fulanodetal@example.com',
        password: '123456',
      })

    const reponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'fulanodetal@example.com',
        password: '123456',
      })

    expect(reponse.statusCode).toEqual(200)
    expect(reponse.body).toEqual({
      token: expect.any(String)
    })
  })
})