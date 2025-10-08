import type { IUser } from './user.interface'
export interface IGroup {
  id: string
  name: string
  description: string
  members: IUser['id'][]
  avatar: {
    src: string
    alt: string
  }

  createdAt: string
  updatedAt: string
  createdBy: IUser['id']
  updatedBy: IUser['id']
}
