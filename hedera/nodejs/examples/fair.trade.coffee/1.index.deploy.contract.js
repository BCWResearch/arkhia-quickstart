console.clear();

const { 
    ContractFunctionParameters, 
    Hbar, 
    ContractExecuteTransaction,
    TokenId 
} = require('@hashgraph/sdk');

const sdkPath = './../../hedera.sdk/';
const SolidityTypes = require(sdkPath + "constants/solidity");

const clientHandler = require('../../hedera.sdk/handlers/clientHandler');
const accountHandler = require('../../hedera.sdk/handlers/accountHandler');
const contractHandler = require('../../hedera.sdk/handlers/contractHandler');
const signatureHandler = require('../../hedera.sdk/handlers/signHandler');

async function storeAndDeployCoffeeContract(client, treasuryKey, contractPath, tokenInfo) {

    const maxTransactionFee = 50;
    const contractObject = await contractHandler.addBigContractFile(contractPath, maxTransactionFee, treasuryKey, client);
    const contractFunctionParameters = new ContractFunctionParameters()
        .addString(tokenInfo.creatorName)
        .addString(tokenInfo.tokenSymbol)
        .addString(tokenInfo.tokenName)
        .addUint64(tokenInfo.initialSupply);

    const contractTx = await contractHandler.deployContract(contractObject.bytecodeFileId, contractFunctionParameters, client);
    const contractRx = await signatureHandler.signTransaction(contractTx, client, treasuryKey);

    console.log(`\nContract deployment successfull\n`);
    console.log(`Contract ID : ${contractRx.contractId}`);
    console.log(`Contract Solidity ID : ${contractRx.contractId.toSolidityAddress()}`);
    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/contract/${contractRx.contractId}\n`);
    return contractRx.contractId;
}

async function tokenContractSanityCheck(client, contractId, name, message, amount) {

    await accountHandler.getAccountBalance(client);
    await contractHandler.getContractCallQuery(client, contractId, "getContractBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenRemainingBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getFairTradeBuyerNumbers", SolidityTypes.Number256);

    // Create FT using TokenSender create function
    const makeDonation = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(2000000)
        .setPayableAmount(amount)
        .setFunction("makeDonationHbars", 
            new ContractFunctionParameters()
            .addString(name)
            .addString(message)
            .addUint256(amount));
          

    const makeDonationTx = await makeDonation.execute(client);
    const makeDonationRx = await makeDonationTx.getRecord(client); //getRecord
    const makeDonationRxResult = makeDonationRx.contractFunctionResult.getUint256(0);

    console.log(`Make donation result:`);
    console.log(makeDonationRxResult);

    await accountHandler.getAccountBalance(client);
    await contractHandler.getContractCallQuery(client, contractId, "getContractBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenRemainingBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getFairTradeBuyerNumbers", SolidityTypes.Number256);
  
    await accountHandler.getAccountBalance(client);
    return makeDonationRx;
}

async function getDonations(client, contractId) {

    // Create FT using TokenSender create function
    const makeDonation = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(2000000)
        .setFunction("withdrawDonations");
          
    const makeDonationTx = await makeDonation.execute(client);
    const makeDonationRx = await makeDonationTx.getRecord(client);  //getRecord
    console.log(`Rx result`);
    console.log(makeDonationRx.status);
}

async function mintFreeTradeToken(client, contractId) {
    // Create FT using TokenSender create function
    const createToken = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(500000)
        .setPayableAmount(50)
        .setFunction("mintFungibleToken");

    const createTokenTx = await createToken.execute(client);
    const createTokenRx = await createTokenTx.getRecord(client);
    const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
    const tokenId = TokenId.fromSolidityAddress(tokenIdSolidityAddr);
        
    console.log(`\nToken created with ID: ${tokenId} from contract Id ${contractId}\n`);

    return tokenId;
}

async function queryContract(client, contractId) {
    await accountHandler.getAccountBalance(client);
    await contractHandler.getContractCallQuery(client, contractId, "getContractBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenRemainingBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getFairTradeBuyerNumbers", SolidityTypes.Number256);
    await accountHandler.getAccountBalance(client);
}

async function CreateFairTradeCoffeeInitialData(getFairTradeContractPath, tokenInfo, client, treasuryKey) {

    // Deploys FairTrade contract (must be compiled first)
    const contractId = await storeAndDeployCoffeeContract(client, treasuryKey, getFairTradeContractPath, tokenInfo);

    // Mint Token supply through contract
    const tokenId = await mintFreeTradeToken(client, contractId);

    // Verify Data after
    await queryContract(client, contractId);

    return { 
        contractId: contractId.toString(), 
        fungibleTokenId: tokenId.toString(), 
    };
}

async function main() {
    // Init clients/users
    const client = await clientHandler.getTestnetClient();
    const treasuryKey = await clientHandler.getTestnetPrivateKey();

    // Set variables
    const tokenInfo = { creatorName: "Arkhia3", tokenSymbol: "AFTC3", tokenName: "ArkhiaFairTrade3", initialSupply: 100000 };
    
    // 1. Deploy Contract
    /*
    const getFairTradeContractPath = './../../../contracts/fairtrade_token_sender_sol_FairTradeCoffee.bin';
    const result = await CreateFairTradeCoffeeInitialData(getFairTradeContractPath, tokenInfo, client, treasuryKey);
    console.log(`Final Output successfull`);
    console.log(result);
    console.log(`\n Please verify all the elements were created successfully.\n\n`);
    console.log(`Contract:          https://explorer.arkhia.io/#/testnet/contract/${result.contractId}`);
    console.log(`Contract Token:    https://explorer.arkhia.io/#/testnet/token/${result.fungibleTokenId}`);
    */

    // 2. Sanity Check
     await tokenContractSanityCheck(client, `0.0.49226471`, "Arkhia", "A little gift", 50);
    
    // 3. Withdraw donations (should fail)
    // await getDonations(client, result.contractId)

}

main();
