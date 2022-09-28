/*
Remove the preceding 0's from the account number. 
For example, if your HEDERA_ACCOUNT_NUMBER is 0.0.442577, you should use 442577
*/

const Web3 = require('web3');
const jsonRpcHandler = require('./handlers/json.rpc.relay');

const web3Provider = new Web3(jsonRpcHandler.getUrl());
const hederaAccount = `1441444`; 

console.log(`Hex address`);
console.log(web3Provider.utils.toHex(hederaAccount));

console.log(`Current HBAR balance`);
web3Provider.eth.getBalance("0x000000000000000000000000000000000015fea4").then(console.log);
