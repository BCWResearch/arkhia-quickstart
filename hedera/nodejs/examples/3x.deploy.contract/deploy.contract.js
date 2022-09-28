
const { AccountId, Client, PrivateKey, ContractFunctionParameters } = require("@hashgraph/sdk");
const hre = require('hardhat');
const hethers = require('@hashgraph/hethers');
const contractUtils = require("./helper/contract.utils");
const jsonRpcRelay = require("../../json-rpc-relay/handlers/json.rpc.relay");
require('dotenv').config({path: '.env'});

deployContractWithSDK = async () => {

    // Client
    if (process.env.OPERATOR_ID === undefined || process.env.OPERATOR_PVKEY === undefined) {
        throw new Error("Env variables missing under .env");
    }
    const accountOperatorId = AccountId.fromString(process.env.OPERATOR_ID);
    const accountOperatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
    const clientTestnet = Client.forTestnet().setOperator(accountOperatorId, accountOperatorKey);

    // Contract info
    const pathToBinFile = `./contract/artifacts/contract_sample_sol_ContractSampleArkhia.bin`;
    const maxTransactionFee = 50; // maximum i want to pay
    const maxChunks = 10; // up to 60kb, change it if the contract get biggers
    
    // Deploy File
    const file = await contractUtils.deployContractFile(clientTestnet, accountOperatorKey, pathToBinFile, maxTransactionFee, maxChunks);
    const byteCodeFileId = file.bytecodeFileId;
    console.log(`Contract file deployed to ${byteCodeFileId}`);
    console.log(`Deploying Contract...`);

    // Set parameters of contract constructor
    const arhiaContractParameters = new ContractFunctionParameters()
        .addString(`Arkhia`)
        .addString(`Learning about contracts with Arkhia`);

    // Sign & Deploy contract
    const contractTx = await contractUtils.deployContractEvm(clientTestnet, byteCodeFileId, arhiaContractParameters);
    const signedTx = await contractTx.sign(accountOperatorKey);
    const deployContractTx = await signedTx.execute(clientTestnet);
    const deployContractReceipt = await deployContractTx.getReceipt(clientTestnet);
    console.log(`Receipt created successfully : ${deployContractReceipt.contractId}`);
    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/contract/${deployContractReceipt.contractId}\n`);
    return deployContractReceipt;
}

deployContractHardhat = async () => {
    const privateKey = process.env.OPERATOR_PVKEY_ETH;
    if (privateKey === undefined || jsonRpcRelay.getUrl() === undefined) throw new Error("No arguments available.")

    // Arrange.
    const provider = new hre.ethers.providers.JsonRpcProvider(jsonRpcRelay.getUrl());
    const wallet = new hre.ethers.Wallet(privateKey, provider);

    console.log(`Deploying contract using ${jsonRpcRelay.getUrl()}`);
    // Act
    const ContractSampleArkhia = await hre.ethers.getContractFactory('ContractSampleArkhia', wallet);
    const greeter = await ContractSampleArkhia.deploy('Arkhia', 'Deploying contracts with Arkhia on Hedera');

    // Assert
    const contractAddress = (await greeter.deployTransaction.wait()).contractAddress;
    const contractId = hethers.utils.getAccountFromAddress(contractAddress);

    console.log(`Greeter contract id: ${hethers.utils.asAccountString(contractId)}`);
    console.log(`Greeter deployed to: ${contractAddress}`);

    return contractAddress;
};


deployContractTruffle = async () => {

}

async function main () {

    // 1. SDK
    //const contractRx = await deployContractWithSDK();
    //console.log(`Contract deployed : ${contractRx.contractId}`);

    // 2. Hardhat
    await deployContractHardhat();

    // 3. Truffle


}


main();
