const { 
    AccountCreateTransaction, 
    AccountBalanceQuery, 
    AccountInfoQuery,
    PrivateKey,
    Client,
    Hbar,
    TransferTransaction
} = require("@hashgraph/sdk");

require('dotenv').config();

const axios = require('axios');

const baseApiUrl = process.env.ARKHIA_BASE_API_URL;
const restApiSuffix = process.env.ARKHIA_REST_API_SUFFIX;
const apiKey = process.env.ARKHIA_API_KEY;
const restApiUrl = `${baseApiUrl}/${restApiSuffix}`;

class RestApiHandler {

    getUrl = () => {
        return restApiUrl;
    }

    getAccountById = async (accountId) => {
        try {
            const accountUrl = `${restApiUrl}/accounts/${accountId}`;
            console.log(`fetching ${accountUrl}`);
            const config = { method: 'get', url: accountUrl,  headers: { 'x-api-key': apiKey } };
         
            const result = await axios(config).then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
            });
            return result;
        
        } catch(e) {
            console.error(e);
        }
    }

    getTokenById = async (tokenId) => {
        try {
            const tokenUrl = `${restApiUrl}/tokens/${tokenId}`;
            const config = { method: 'get', url: tokenUrl,  headers: { 'x-api-key': apiKey } };
            return await axios(config).then(function (response) { }).catch(function(error) { console.log(error);});
        } catch(e) {
            console.error(e);
        }
    }

}

module.exports = Object.freeze(new RestApiHandler());
