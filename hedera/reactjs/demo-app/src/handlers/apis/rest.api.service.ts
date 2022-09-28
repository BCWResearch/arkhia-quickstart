import appConfig from "@/config/appConfig";
import axios from "axios";

const body = { headers: { "x-api-key": appConfig.arkhiaApi.arkhiaApiKey } };
const restApiUrl = appConfig.arkhiaApi.getRestApiUrl();

const getContractById = async (contract_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.contracts}/${contract_id}`;
    const response = await axios.get(url, body);
    
    return response.data;
};

const getAccountById = async (account_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.accounts}/${account_id}/`;
    const response = await axios.get(url, body);
    return response.data;
};

const getTokenById = async (token_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.tokens}/${token_id}`;
    const response = await axios.get(url, body);
    return response.data;
};

const getNftById = async (nft_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.tokens}/${nft_id}/nfts`;
    const response = await axios.get(url, body);
    return response.data;
};


const getContractResultsById = async (contract_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.contracts}/${contract_id}/results`;
    const response = await axios.get(url, body);
    
    return response.data;
};

const getContractResultLogsById = async (contract_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.contracts}/${contract_id}/results/logs`;
    const response = await axios.get(url, body);
    
    return response.data;
};

const getTransactionsByAccountId = async (account_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.transactions}/?account.id=${account_id}`;
    const response = await axios.get(url, body);
    
    return response.data;
};

const getDepositTransactionsByAccountId = async (account_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.transactions}/?account.id=${account_id}&type=credit`;
    const response = await axios.get(url, body);
    
    return response.data;
};

const getWithdrawTransactionsByAccountId = async (account_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.transactions}/?account.id=${account_id}&type=debit`;
    const response = await axios.get(url, body);
    
    return response.data;
};

const getStateProofAlpha = async (transaction_id: string) => {
    const url = `${restApiUrl}${appConfig.restEndpoints.transactions}/${transaction_id}/stateproof`;
    const response = await axios.get(url, body);

    return response.data;
};

export const RestApiService = {
    getAccountById,
    getNftById,
    getTokenById,
    getContractById,
    getContractResultsById,
    getContractResultLogsById,
    getTransactionsByAccountId,
    getDepositTransactionsByAccountId,
    getWithdrawTransactionsByAccountId,
    getStateProofAlpha
};
