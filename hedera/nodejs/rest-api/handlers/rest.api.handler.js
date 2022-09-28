require('dotenv').config();

const axios = require('axios');
const baseApiUrl = process.env.ARKHIA_BASE_API_URL;
const restApiSuffix = process.env.ARKHIA_REST_API_SUFFIX;
const apiKey = process.env.ARKHIA_API_KEY;
const restApiUrl = `${baseApiUrl}/${restApiSuffix}`;
const body = { headers: { "x-api-key": apiKey } };

class RestApiHandler {

    getUrl = () => {
        return restApiUrl;
    }

    getAccountById = async (accountId) => {
        try {
            const accountUrl = `${restApiUrl}/accounts/${accountId}`;
            const response = await axios.get(accountUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTokens = async () => {
        try {
            const tokensUrl = `${restApiUrl}/tokens`;
            const response = await axios.get(tokensUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTokenById = async (tokenId) => {
        try {
            const tokenUrl = `${restApiUrl}/tokens/${tokenId}`;
            const response = await axios.get(tokenUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContracts = async () => {
        try {
            const contractUrl = `${restApiUrl}/contracts`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getContractById = async (contract_id) => {
        try {
            const contractUrl = `${restApiUrl}/contracts/${contract_id}`;
            const response = await axios.get(contractUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getTransactions = async () => {
        try {
            const transactionsUrl = `${restApiUrl}/transactions`;
            const response = await axios.get(transactionsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getNetworkNodes = async() => {
        try {
            const networkNodesUrl = `${restApiUrl}/network/nodes`;
            const response = await axios.get(networkNodesUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }

    getAccounts = async() => {
        try {
            const accountsUrl = `${restApiUrl}/accounts`;
            const response = await axios.get(accountsUrl, body);
            return response;
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = Object.freeze(new RestApiHandler());
