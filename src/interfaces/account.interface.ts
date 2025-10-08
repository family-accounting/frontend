import type { IUser } from "./user.interface"

export interface IAccount {
    id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    color: string
    
    icon: string
    avatar: {
        src: string
        alt: string
    }
    createdBy: IUser['id']
    updatedBy: IUser['id']
}