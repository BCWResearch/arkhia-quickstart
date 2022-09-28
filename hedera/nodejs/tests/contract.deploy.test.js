console.clear();

require('dotenv').config({path: '.env'});
const { expect } = require('chai');

describe('Hedera Environment variables', function() {
    it('should be able to get the account hedera id ', async function() {
        expect(process.env.OPERATOR_ID).to.not.be.NaN;
    });
    it('should be able to get the account evm account id ', async function() {
        expect(process.env.OPERATOR_EVM_ID).to.not.be.NaN;
    });
    it('should be able to get the account config private key ', async function() {
        expect(process.env.OPERATOR_PVKEY).to.not.be.NaN;
    });
    it('should be able to get the account config eth pvkey ', async function() {
        expect(process.env.OPERATOR_PVKEY_ETH).to.not.be.NaN;
    });
    it('should be able to get the network id ', async function() {
        expect(process.env.NETWORK_ID).to.not.be.NaN;
    });
    it('should be able to get the EDCSA account config ', async function() {
        expect(process.env.OPERATOR_ID_ECDSA).to.not.be.NaN;
    });
    it('should be able to get the EDCSA account config private key ', async function() {
        expect(process.env.OPERATOR_PVKEY_ECDSA).to.not.be.NaN;
    });
    it('should be able to get the EDCSA account config eth pvkey ', async function() {
        expect(process.env.OPERATOR_ETHKEY_ECDSA).to.not.be.NaN;
    });

});


