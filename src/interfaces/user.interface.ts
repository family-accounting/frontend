export interface IUser {
  id: string;
  username: string;
  email?: string;
  icon?: string;
  color?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
