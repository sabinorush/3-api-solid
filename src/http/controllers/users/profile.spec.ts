import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be abe to get a user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'fulano da silva',
        email: 'fulanodetal@example.com',
        password: '123456',
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'fulanodetal@example.com',
        password: '123456',
      })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)

    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'fulanodetal@example.com',
      }),
    )
  })
})