/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const jsonUrlHandler = require('../../json-rpc-relay/handlers/json.rpc.relay');
const operatorPrivateKey = process.env.OPERATOR_PVKEY_ETH;

module.exports = {
  defaultNetwork: "hedera",
  solidity: "0.8.9", 
  networks: {
    hedera: {
      url: jsonUrlHandler.getUrl(),
      accounts: [operatorPrivateKey.toString()]  
    }
  },
};
