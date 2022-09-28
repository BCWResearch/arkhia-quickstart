export interface HederaKey {
    _type: string;
    key: string;
}

export interface HederaTokenTransfer {
    token_id:string;
    account: string;
    amount: number;
    is_approval: boolean;
}

export interface HederaAccountTransfer {
    account: string;
    amount: number;
    is_approval: boolean;
}

