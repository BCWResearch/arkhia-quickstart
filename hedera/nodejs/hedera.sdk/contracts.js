console.clear();

const { 
    ContractFunctionParameters, 
    Hbar, 
    ContractExecuteTransaction,
    TokenId 
} = require('@hashgraph/sdk');

const SolidityTypes = require('./constants/constants');

const clientHandler = require('./handlers/clientHandler');
const accountHandler = require('./handlers/accountHandler');
const contractHandler = require('./handlers/contractHandler');
const signatureHandler = require('./handlers/signHandler');
const tokenHandler = require('./handlers/tokenHandler');

let client;
let aliceClient;
let bobClient;
let treasuryKey;

async function init() {
	client =  await clientHandler.getTestnetClient();
    aliceClient = await clientHandler.getAliceTestnetClient();
    bobClient = await clientHandler.getBobTestnetClient();
	treasuryKey = await clientHandler.getTestnetPrivateKey();;
}

async function storeAndDeployCoffeeContract(client, treasuryKey, contractPath) {

    const contractObject = await contractHandler.addBigContractFile(contractPath, 50, treasuryKey, client);
    const contractFunctionParameters = new ContractFunctionParameters()
        .addString("Arkhia")
        .addString("FTC")
        .addString("FairTradeCoffee")
        .addUint64(100000);

    const contractTx = await contractHandler.deployContract(contractObject.bytecodeFileId, contractFunctionParameters, client);
    const contractRx = await signatureHandler.signTransaction(contractTx, client, treasuryKey);

    console.log(`Contract deployed : ${contractRx.contractId}`);
    console.log(`Solidity address : ${contractRx.contractId.toSolidityAddress()}`);
    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/contract/${contractRx.contractId}`);
    return contractRx.contractId;
}

async function setCreatorName(client, contractId, newName) {
    
    // Call contract function to update the state variable
    const contractExecuteTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("setCreatorName", new ContractFunctionParameters().addString(newName))
        .setMaxTransactionFee(new Hbar(10));
    
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
    console.log(`- Contract function call status: ${contractExecuteRx.status} \n`);
}

async function mintFreeTradeToken(contractIdSender) {

    // Create FT using TokenSender create function
    const createToken = new ContractExecuteTransaction()
        .setContractId(contractIdSender)
        .setGas(500000)
        .setPayableAmount(50)
        .setFunction("mintFungibleToken");

    const createTokenTx = await createToken.execute(client);
    const createTokenRx = await createTokenTx.getRecord(client);
    const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
    const tokenId = TokenId.fromSolidityAddress(tokenIdSolidityAddr);
        
    console.log(`Token created with ID: ${tokenId}`);
}

async function queryContract(client, contractId) {
    await accountHandler.getAccountBalance(client);
    await contractHandler.getContractCallQuery(client, contractId, "getCreatorName", SolidityTypes.String);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenSymbol", SolidityTypes.String);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenName", SolidityTypes.String);
    await contractHandler.getContractCallQuery(client, contractId, "getInitialSupply", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getContractAddress", SolidityTypes.Address);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenAddress", SolidityTypes.Address);
    await accountHandler.getAccountBalance(client);
}


async function transferToken(client, aliceClient, contractId, amount) {

    const evmTokenAddress = await contractHandler
        .getContractCallQuery(client, contractId, "getTokenAddress", SolidityTypes.Address);
    const aliceClientEvm = aliceClient.operatorAccountId.toSolidityAddress();
    const tokenId = TokenId.fromSolidityAddress(evmTokenAddress);

    const tokenTransfer = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1500000)
        .setFunction("transferPrecompile",
            new ContractFunctionParameters()
                .addAddress(evmTokenAddress)
                .addAddress(aliceClientEvm)
                .addInt64(amount)
        );
    const tokenTransferTx = await tokenTransfer.execute(client);
    const tokenTransferRx = await tokenTransferTx.getReceipt(client);
    const tokenTransferStatus = tokenTransferRx.status;
 
    console.log("Token transfer transaction status: " + tokenTransferStatus.toString());

    await contractHandler.getContractTokenBalance(client, contractId, tokenId);
    await tokenHandler.getClientTokenBalance(client, aliceClient.operatorAccountId, tokenId);

	return;
}

async function deployAndMintToken() {
    // Deploys contract
    const getFairTradeContractPath = './../../contracts/bins/fairtrade_token_sender_sol_FairTradeCoffee.bin';
    const contractId = await storeAndDeployCoffeeContract(client, treasuryKey, getFairTradeContractPath);
    console.log(`Contract ID : ${contractId}`);

    // Mint and get data
    await mintFreeTradeToken(contractId);
    return contractId;
}

async function main() {
	
    await init();
    const contractId = await deployAndMintToken();
    await queryContract(client, contractId);

    
    // const contractId = `0.0.49166204`;
    // await transferToken(client, aliceClient, contractId, 100);  
}

main();
