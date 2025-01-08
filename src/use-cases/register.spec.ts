import { expect, describe, it } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fulano de Tal',
      email: 'fuladetal@exemplo.com',
      password: '123456'
    })


    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fulano de Tal',
      email: 'fuladetal@exemplo.com',
      password: '123456'
    })

    const isPasswordCorrectlyHased = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHased).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'fuladetal@example.com'

    await registerUseCase.execute({
      name: 'Fulano de Tal',
      email,
      password: '123456'
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Fulano de Tal',
        email,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})