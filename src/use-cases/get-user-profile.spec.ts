import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { expect, describe, it, beforeEach } from "vitest"
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found"

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Fulano de tal',
      email: 'fuladetal@exemplo.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Fulano de tal')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)

  })
})