export interface IUser {
  id: string
  name: string
  email: string
  mobile: string
  avatar: {
    src: string
    alt: string
  }
  icon: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
}
