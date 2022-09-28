import { HederaKey } from "./misc";
import { AccountToken } from "./tokens";
import { HederaTransaction } from "./transaction";

export interface Account {
    account: string;
    alias: string;
    auto_renew_period: number;
    balance: Balance;
    evm_address: string;
    expiry_timestamp: string;
    key: HederaKey;
    transactions: HederaTransaction[];
}

interface Balance {
    balance: number;
    timestamp:string;
    tokens: AccountToken[];
}

