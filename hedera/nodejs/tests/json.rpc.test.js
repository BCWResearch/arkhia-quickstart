console.clear();

require('dotenv').config({path: '.env'});

const { expect } = require('chai');
const jsonApiHandler = require('./../json-rpc-relay/handlers/json.rpc.relay');

describe('JsonRpc relay tests', function() {

    it('should be able to get the balance of an account', async function() {
        this.timeout(5000);
        const balance = await jsonApiHandler.web3_getBalance(process.env.OPERATOR_ID_ECDSA_EVM); //ECDSA EVM 
        expect(balance).to.not.be.empty;
    });

});
