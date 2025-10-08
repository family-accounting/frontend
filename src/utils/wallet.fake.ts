import { faker } from '@faker-js/faker'
import type { IWallet } from '@/interfaces/wallet.interface'
import type { IUser } from '@/interfaces/user.interface'

const userIds: IUser['id'][] = Array.from({ length: 50 }, () => faker.string.uuid())

export const fakeWallets: IWallet[] = Array.from({ length: 20 }, () => {
    const createdBy = faker.helpers.arrayElement(userIds)
    const updatedBy = faker.helpers.arrayElement(userIds)

    return {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        color: faker.color.rgb({ prefix: '#' }),
        icon: faker.helpers.arrayElement([
            '💰',
            '🏦',
            '💳',
            '📱',
            '🪙',
            '🤑',
            '💸',
            '🏧',
        ]),
        avatar: {
            src: faker.image.avatar(),
            alt: faker.word.words(2),
        },
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        createdBy,
        updatedBy,
    }
})
