export interface ITag {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  icon?: string;
  color?: string;
}
