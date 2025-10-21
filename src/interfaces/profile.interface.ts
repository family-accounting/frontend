export interface IProfile {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface IWallet {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
