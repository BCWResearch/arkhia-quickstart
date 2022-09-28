const sdkPath = './../../hedera.sdk/';
const SolidityTypes = require(sdkPath + "constants/solidity");

const clientHandler = require('../../hedera.sdk/handlers/clientHandler');
const accountHandler = require('../../hedera.sdk/handlers/accountHandler');
const contractHandler = require('../../hedera.sdk/handlers/contractHandler');
const signatureHandler = require('../../hedera.sdk/handlers/signHandler');
const nftHandler = require('../../hedera.sdk/handlers/nftHandler');
const topicHandler = require('../../hedera.sdk/handlers/topicHandler');
const tokenHandler = require('../../hedera.sdk/handlers/tokenHandler');
const restApiHandler = require('../../rest-api/handlers/rest.api.handler');


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


async function TriggerFairTradeCoffeeUserJourney(client, clientKey,  signClient, hederaItems, userPayload) {

    const contractId = hederaItems.contractId;
    const topicId = hederaItems.topicId;
    const nftId = hederaItems.nftId;
    const fungibleTokenId = hederaItems.fungibleTokenId;

    const accountId = signClient.operatorAccountId.toString();
    const amount = userPayload.amountToExchange;

    // Use MIRROR NODE to validate
    // 1. User has enough balance 
    // 2. User has token associated
    
    const response = await restApiHandler.getAccountById(accountId.toString());
    if (response === null) return;

    const tinyHbarsBalance = response.data.balance.balance;
    const tinyHbarsAmount = amount * 100000000;
    const accountTokens = response.data?.balance?.tokens;
    const associatedToken = accountTokens.find((item) => item.token_id === fungibleTokenId);

    if (tinyHbarsBalance < tinyHbarsAmount) {
        console.log(`Client ${accountId} does not have enough hBars balance (${Hbar.fromTinybars(tinyHbarsBalance).toString()}) to exchange for [${fungibleToken}] => ${amount}`);
        return;
    }

    const accountInfo = await accountHandler.getAccountInfo(client, client.operatorAccountId.toString());
    const tokenMap = accountInfo.tokenRelationships.get(fungibleTokenId);
    console.log(`values`);
    console.log(accountInfo.tokenRelationships.values());

    console.log(`token associated??`);
    console.log(tokenMap);
    /*
    tokenMap.array.forEach((token) => {
        console.log(`token`);
        console.log(token);
    });
    */

    // Balance file 15min
    if (associatedToken == null) {
        console.log(`Client ${client.operatorAccountId.toString()} does not have token ${fungibleTokenId} associated. Please associate it first.`);
       return;
    }

    // Transfer Hbars to contract 
    console.log(`Before transaction:`);
    await contractHandler.getContractCallQuery(signClient, contractId, "getBalance", SolidityTypes.Number256);   
    const transactionTx = await accountHandler.transferHbar(signClient, accountId, contractId, amount);
    
    await tokenHandler.getClientTokenBalance(signClient, fungibleTokenId);
    const transferTokenRx = await transferToken(signClient, contractId, amount); 
    console.log(`Token transfer amount : ${amount}  ${fungibleTokenId} -> ${signClient.operatorAccountId.toString()} status: ${transferTokenRx.status.toString()}`);
   
    console.log(`\n\n New Contract Balance`);
    await contractHandler.getContractCallQuery(signClient, contractId, "getBalance", SolidityTypes.Number256);
    console.log(`\n\n New Token Balance`);
    await tokenHandler.getClientTokenBalance(signClient, fungibleTokenId);


    console.log(`Transfer nft ${nftId} 1 to account ${accountId}...`);
    const transferNftTx = await nftHandler
        .transferNFTToken(client, clientKey, nftId, 1, client.operatorAccountId.toString(), accountId);
    

    let tokenTransferSubmit = await transferNftTx.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
    console.log(`NFT Token transfer status : ${tokenTransferRx.status}`);

    // Create TOPIC with name/message
    await topicHandler.submitTopicMessage(client, topicId, `${userPayload.name} : ${userPayload.message}`);
}

async function transferToken(targetClient, contractId, amount) {

    const evmTokenAddress = await contractHandler.getContractCallQuery(targetClient, contractId, "getTokenAddress", SolidityTypes.Address);
    const targetClientEvm = targetClient.operatorAccountId.toSolidityAddress();

    const tokenTransfer = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1500000)
        .setFunction("exchangeFairTradeToken",
            new ContractFunctionParameters()
                .addAddress(evmTokenAddress)
                .addAddress(targetClientEvm)
                .addInt64(amount)
        );
    const tokenTransferTx = await tokenTransfer.execute(targetClient);
    const tokenTransferRx = await tokenTransferTx.getReceipt(targetClient);

	return tokenTransferRx;
}

async function main() {
    // Init clients/users
    const client = await clientHandler.getTestnetClient();
    const treasureKey = await clientHandler.getTestnetPrivateKey();

    const aliceClient = await clientHandler.getTestnetClientECDSA();

    const hederaItems =
    {
        contractId: '0.0.49210330',
        fungibleTokenId: '0.0.49210331',
        topicId: '0.0.49210332',
        nftId: '0.0.49210334'
    };

    const userPayload = 
    {
        amountToExchange: 20,
        name: "Mary Lou",
        message: "Can't wait to get my fair trade coffee , looking forward!"
    }

    // Change this.
    await TriggerFairTradeCoffeeUserJourney(client, treasureKey, aliceClient, hederaItems, userPayload)   
}

main();
