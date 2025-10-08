import { faker } from '@faker-js/faker'
import type { IGroup } from '@/interfaces/group.interface'
import type { IUser } from '@/interfaces/user.interface'

const userIds: IUser['id'][] = Array.from({ length: 50 }, () => faker.string.uuid())

export const fakeGroups: IGroup[] = Array.from({ length: 20 }, () => {
    const memberCount = faker.number.int({ min: 3, max: 15 })
    const members = faker.helpers.arrayElements(userIds, memberCount)

    const createdBy = faker.helpers.arrayElement(userIds)
    const updatedBy = faker.helpers.arrayElement(userIds)

    return {
        id: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        members,
        avatar: {
            src: faker.image.avatar(),
            alt: faker.person.fullName(),
        },
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        createdBy,
        updatedBy,
    }
})
