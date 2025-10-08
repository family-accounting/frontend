import type { IUser } from "./user.interface"

export interface ITag {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  createdBy: IUser['id']
  updatedBy: IUser['id']
}