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

class JsonRpcRelayHandler {

    getUrl = () => {
        const baseApiUrl = process.env.ARKHIA_BASE_API_URL;
        const jsonApiUrl = process.env.ARKHIA_JSON_RPC_API_SUFFIX;
        const apiKey = process.env.ARKHIA_API_KEY;

        const jsonUrl = `${baseApiUrl}/${jsonApiUrl}?x_api_key=${apiKey}`;
        console.log(jsonUrl);
        return jsonUrl;
    }

    getBalance = () => {

    }

    executeRawTransaction = () => {
        
    }
}

module.exports = Object.freeze(new JsonRpcRelayHandler());
