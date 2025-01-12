import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

  it('should be abe to register', async () => {
    const reponse = await request(app.server)
      .post('/users')
      .send({
        name: 'fulano da silva',
        email: 'fulanodetal@example.com',
        password: '123456',
      })

      expect(reponse.statusCode).toEqual(201)
  })
})