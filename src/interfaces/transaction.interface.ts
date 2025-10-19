export interface ITransaction {
  id: string;
  name: string;
  icon: string;
  groupId: string;
  amount: number;
  date: Date;
  description: string;
  type: "income" | "expense";
  category: string;
  subCategory: string;
  tags: string[];
  attachments: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
