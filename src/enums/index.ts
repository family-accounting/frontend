export enum AuthUrl {
    LOGIN = '/auth/login',
    SIGNUP = '/auth/signup',
    PROFILE = '/auth/profile',
    REFRESH = '/auth/refresh',
    LOGOUT = '/auth/logout',
}

export enum AccountUrl {
    GET_ACCOUNTS = '/accounts',
    CREATE_ACCOUNT = '/accounts',
    UPDATE_ACCOUNT = '/accounts/:id',
    DELETE_ACCOUNT = '/accounts/:id',
    GET_ACCOUNTS_BY_CURRENCY = '/accounts/by-currency/:currency',
    GET_ACCOUNT_BALANCE = '/accounts/balance/:currency',
}

export enum TransactionUrl {
    GET_TRANSACTIONS = '/transactions',
    CREATE_TRANSACTION = '/transactions',
    UPDATE_TRANSACTION = '/transactions/:id',
    DELETE_TRANSACTION = '/transactions/:id',
}

export enum LoanUrl {
    GET_LOANS = '/loans',
    CREATE_LOAN = '/loans',
    UPDATE_LOAN = '/loans/:id',
    DELETE_LOAN = '/loans/:id',
    GET_PENDING_LOANS = '/loans/pending',
    GET_OVERDUE_LOANS = '/loans/overdue',
    GET_LOAN_SUMMARY = '/loans/summary',
    GET_LOAN_BY_ID = '/loans/:id',
}


export enum UserRole {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    VIEWER = 'VIEWER',
}