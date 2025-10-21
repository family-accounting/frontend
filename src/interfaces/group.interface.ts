import { IMember } from "./member.interface";
import { ITransaction } from "./transaction.interface";

export interface IGroup {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  members: IMember[];
  transactions: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
