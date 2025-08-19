import { AccountModel } from "./account.model";
import { TransactionModel } from "./transaction.model";
import { LoanModel } from "./loan.model";
import { UserRole } from "src/enums";

export interface UserModel {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    accounts: AccountModel[];
    sourceTransactions: TransactionModel[];
    targetTransactions: TransactionModel[];
    loansGiven: LoanModel[];
    loansReceived: LoanModel[];
}
