import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/interfaces/user.interface'
import { fakeUsers } from '@/utils/user.fake'

export const useUserStore = defineStore('user', () => {
    const users = ref<IUser[]>([...fakeUsers])

    const getUserById = (userId: IUser['id']) => {
        return users.value.find((user) => user.id === userId) as IUser
    }

    const createUser = (user: IUser) => {
        users.value.push(user)
    }

    const updateUser = (user: IUser) => {
        const index = users.value.findIndex((user) => user.id === user.id)
        users.value[index] = user
    }

    const deleteUser = (userId: IUser['id']) => {
        users.value = users.value.filter((user) => user.id !== userId)
    }

    return { users, getUserById, createUser, updateUser, deleteUser }
})
