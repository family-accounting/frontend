import type { IUser } from './user.interface'

export interface ITransaction {
  id: string
  name: string
  description: string
  amount: number
  type: string
  category: string
  date: string
  time: string
  location: string
  createdAt: string
  updatedAt: string
  createdBy: IUser['id']
  updatedBy: IUser['id']
}
