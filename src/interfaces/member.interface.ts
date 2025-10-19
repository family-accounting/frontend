export interface IMember {
    id: string;
    name: string;
    icon: string;
    groupId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    isAdmin: boolean;
    isActive: boolean;
    isDeleted: boolean;
    isBlocked: boolean;
    isVerified: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
}