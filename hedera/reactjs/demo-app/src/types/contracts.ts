export interface Contract {
    contractRestApi: ContractRestApi;
    contractSolData: ContractSolData;
}

export interface ContractSolData {
    contractInfo: ContractSolInfo;
    fairTradeDonators?: ContractSolDataDonators[];
    contractBalance: number;
}

export interface ContractSolInfo {
    creatorName: string;
    tokenAddress: string;
    tokenName: string;
    tokenSupply: string;
    tokenSymbol: string;
}

export interface ContractSolDataDonators {
    amount: string;
    from: string;
    message: string;
    name: string;
    timestamp: string;
}

export interface ContractRestApi {
    admin_key: string;
    auto_renew_account: string;
    auto_renew_period: string;
    contract_id: string;
    created_timestamp: string;
    deleted: string;
    evm_address: string;
    expiration_timestamp: string;
    filed_id: string;
    max_automatic_token_associations: number;
    memo: string;
    obtainer_id: string;
    permanent_removal: string;
    proxy_account_id: string;
    timestamp: contractTimestamp;
}

interface contractTimestamp {
    from: string;
    to: string;
}
