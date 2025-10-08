import { faker } from '@faker-js/faker'
import type { ITag } from '@/interfaces/tag.interface'
import type { IUser } from '@/interfaces/user.interface'

const userIds: IUser['id'][] = Array.from({ length: 50 }, () => faker.string.uuid())

export const fakeTags: ITag[] = Array.from({ length: 20 }, () => {
    const createdBy = faker.helpers.arrayElement(userIds)
    const updatedBy = faker.helpers.arrayElement(userIds)

    return {
        id: faker.string.uuid(),
        name: faker.word.noun(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        createdBy,
        updatedBy,
    }
})
