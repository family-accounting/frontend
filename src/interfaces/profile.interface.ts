import type { IUser } from './user.interface'

export interface IProfile {
  id: string
  firstName: string
  lastName: string
  avatar: string
  createdAt: string
  updatedAt: string
  userId: IUser['id']
}
