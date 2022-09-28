require('dotenv').config();

require('dotenv').config({path: './../../.env'});
const baseApiUrl = process.env.ARKHIA_BASE_API_URL;
const jsonApiUrl = process.env.ARKHIA_JSON_RPC_API_SUFFIX;
const apiKey = process.env.ARKHIA_API_KEY;
const Web3 = require('web3');
const jsonUrlEndpoint = `${baseApiUrl}/${jsonApiUrl}/${apiKey}`;


class JsonRpcRelayHandler {

    getUrl = () => {
        return jsonUrlEndpoint;
    }

    web3_getBalance = async (account_id_edsa_evm) => {
        const web3Provider = new Web3(jsonUrlEndpoint);
        const balance = await web3Provider.eth.getBalance(account_id_edsa_evm);
        return balance;
    }

}

module.exports = Object.freeze(new JsonRpcRelayHandler());
