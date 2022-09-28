/*
Remove the preceding 0's from the account number. 
For example, if your HEDERA_ACCOUNT_NUMBER is 0.0.442577, you should use 442577
*/
const Web3 = require('web3');
const jsonRpcRelay = require('./handlers/json.rpc.relay');

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.

const web3Provider = new Web3(jsonRpcRelay.getUrl());
const hederaAccount = `1441444`; // no need for 0.0

console.log(`Hex address`);
console.log(web3Provider.utils.toHex(hederaAccount));

console.log(`Current HBAR balance`);
web3Provider.eth.getNodeInfo()
    .then((res) => console.log(`-> get is node listening`, res))
    .catch(e => console.log('-> get is node listening: ' + e));



