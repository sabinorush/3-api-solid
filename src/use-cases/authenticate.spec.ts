import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { expect, describe, it } from "vitest"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./errors/invalid-crendentials-error"

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository) //sut => system under test

    await usersRepository.create({
      name: 'Fulano de tal',
      email: 'fuladetal@exemplo.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'fuladetal@exemplo.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository) //sut => system under test

    await expect(() =>
      sut.execute({
        email: 'fuladetal@exemplo.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository) //sut => system under test

    await usersRepository.create({
      name: 'Fulano de tal',
      email: 'fuladetal@exemplo.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'fuladetal@exemplo.com',
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})