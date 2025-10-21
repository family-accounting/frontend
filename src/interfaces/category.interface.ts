export interface ICategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
// Single, consistent ICategory definition; all fields are optional to allow flexible creation
