import { faker } from '@faker-js/faker'
import type { IUser } from '@/interfaces/user.interface'

export const fakeUsers: IUser[] = Array.from({ length: 20 }, () => {
    const name = faker.person.fullName()
    const email = faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] })
    const mobile = faker.phone.number({ style: 'national' })

    return {
        id: faker.string.uuid(),
        name,
        email,
        mobile,
        avatar: {
            src: faker.image.avatar(),
            alt: name,
        },
        icon: faker.helpers.arrayElement(['👨‍💻', '👩‍💻', '🧑‍💼', '🧑‍🔧', '🧑‍🎨']),
        password: faker.internet.password({ length: 12, memorable: true }),
        role: faker.helpers.arrayElement(['admin', 'manager', 'user', 'guest']),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
    }
})
