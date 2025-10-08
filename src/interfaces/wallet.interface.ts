import type { IUser } from './user.interface'

export interface IWallet {
  id: string
  name: string
  description: string
  color: string
  icon: string
  avatar: {
    src: string
    alt: string
  }
  createdAt: string
  updatedAt: string
  createdBy: IUser['id']
  updatedBy: IUser['id']
}
