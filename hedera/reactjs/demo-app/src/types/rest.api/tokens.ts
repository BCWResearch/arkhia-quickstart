import { HederaKey } from "./misc";
import { TokenSupplyType } from "@hashgraph/sdk";

export interface AccountToken {
    token_id: string;
    balance: number;
}

export interface FullToken {
    admin_key: string;
    name: string;
    auto_renew_account: string;
    created_timestamp: string;
    decimals: string;
    deleted: boolean;
    expiry_timestamp: string;
    fee_schedule_key: string;
    freeze_key: string;
    initial_supply: string;
    kyc_key: string;
    max_supply: string;
    memo: string;
    modified_timestamp: string;
    pause_key: string;
    pause_status: string;
    supply_key: HederaKey;
    supply_type: TokenSupplyType;
    symbol: string;
    token_id: string;
    total_supply: string;
    treasury_account_id: string;
    wipe_key: HederaKey;
  
}


