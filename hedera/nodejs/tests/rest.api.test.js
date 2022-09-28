console.clear();

require('dotenv').config({path: '.env'});

const { expect } = require('chai');
const restApiHandler = require('./../rest-api/handlers/rest.api.handler');

describe('Rest API tests', function() {

    it('should be able to get the account by id', async function() {
        const contracts = await restApiHandler.getAccountById(process.env.OPERATOR_ID)
        expect(contracts).to.have.property('status').equals(200);
    });
  
    it('should be able to get the contracts', async function() {
      const contracts = await restApiHandler.getContracts();
      expect(contracts).to.have.property('status').equals(200);
    });

    it('should be able to get the accounts', async function() {
        const accounts = await restApiHandler.getAccounts();
        expect(accounts).to.have.property('status').equals(200);
    });

    it('should be able to get the tokens', async function() {
        const tokens = await restApiHandler.getTokens();
        expect(tokens).to.have.property('status').equals(200);
    });

    it('should be able to get the network nodes', async function() {
        const nodes = await restApiHandler.getNetworkNodes();
        expect(nodes).to.have.property('status').equals(200);
    });
   
});
