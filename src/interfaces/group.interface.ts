export interface IGroup {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}