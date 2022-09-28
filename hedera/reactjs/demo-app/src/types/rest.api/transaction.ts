import { HederaAccountTransfer, HederaTokenTransfer } from "./misc";

export interface HederaTransaction {
    bytes: string;
    charged_tx_fee: number;
    consensus_timestamp: string;
    entity_id: string;
    max_fee: string;
    memo_base64: string;
    name: string;
    node: string;
    nonce: number;
    parent_consensus_timestamp: string;
    result: string;
    scheduled: boolean;
    token_transfers: HederaTokenTransfer[];
    transaction_hash: string;
    transaction_id: string;
    transfers: HederaAccountTransfer[];
    account_transfer: HederaAccountTransfer[];
    valid_duration_seconds: string;
    valid_start_timestamp: string;
}
