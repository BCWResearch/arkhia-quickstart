console.clear();

require('dotenv').config({path: '.env'});

const { expect } = require('chai');

describe('Arkhia Environment variables', function() {
    it('should be able to get the Rest Api suffix ', async function() {
        expect(process.env.ARKHIA_REST_API_SUFFIX).to.not.be.NaN;
    });
    it('should be able to get the Json-rpc Api suffix ', async function() {
        expect(process.env.ARKHIA_JSON_RPC_API_SUFFIX).to.not.be.NaN;
    });
    it('should be able to get the Json Api suffix ', async function() {
        expect(process.env.ARKHIA_JSON_RPC_API_SUFFIX).to.not.be.NaN;
    });
    it('should be able to get the Json api suffix ', async function() {
        expect(process.env.ARKHIA_BASE_API_URL).to.not.be.NaN;
    });
    it('should be able to get the Json api suffix ', async function() {
        expect(process.env.ARKHIA_API_KEY).to.not.be.NaN;
    });
})
