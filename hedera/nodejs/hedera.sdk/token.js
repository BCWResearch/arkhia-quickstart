console.clear();

const { TokenSupplyType } = require('@hashgraph/sdk');
const clientHandler = require('./handlers/clientHandler');
const signHandler = require("./handlers/signHandler");
const tokenHandler = require('./handlers/tokenHandler');


let client
let treasuryKey;
let aliceClient;
let aliceKey;

async function init() {
	client =  await clientHandler.getTestnetClient();
	treasuryKey = await clientHandler.getTestnetPrivateKey();
	aliceClient = await clientHandler.getAliceTestnetClient();
	aliceKey = await clientHandler.getAliceTestnetPrivateKey();
}

async function createFungibleToken(name, symbol, supplyType, initialSupply) {
	// Create initial token
	const fungibleToken = await tokenHandler.createFungibleToken(
		treasuryKey,
		client, 
		client.operatorAccountId,
		name, 
		symbol, 
		supplyType,
		initialSupply);

	const fungibleTokenTx = await signHandler.signTransaction(fungibleToken, client, treasuryKey);
	console.log(`Token successfully : ${fungibleTokenTx.tokenId.num}`);
	console.log(`See token @ https://explorer.arkhia.io/#/testnet/token/0.0.${fungibleTokenTx.tokenId.num}`);
}

async function mintToken(tokenId, mintNumber) {
	const mintToken = await tokenHandler.mintFungibleToken(tokenId, mintNumber, client);
	console.log(mintToken);
	console.log(`Minting ${mintNumber} with account  ${client.operatorAccountId}..`);

	const signToken = await signHandler.signTransaction(mintToken, client, treasuryKey);
	console.log(`Token ${tokenId} : Minted ${mintNumber}`);
	console.log(signToken);
}

async function burnToken(tokenId, burnNumber) {
	const burnToken = await tokenHandler.burnFungibleToken(tokenId, burnNumber, client);
	const signBurnToken = await signHandler.signTransaction(burnToken, client, treasuryKey);
	console.log(`Token ${tokenId} has been burned ${burnNumber} times`);
	console.log(signBurnToken);
}

async function associateToken(client, tokenId, privateKey) {
	const associateToken = await tokenHandler.associateToken([tokenId], client.operatorAccountId, client);
	const associateTokenReceipt = await signHandler.signTransaction(associateToken, client, privateKey);
	console.log(`Token ${tokenId} associated to private Key ${privateKey} / Account Id ${client.operatorAccountId}`);
	console.log(associateTokenReceipt);
	console.log(associateTokenReceipt.status);
}

async function transferToken(client, tokenId, destinationPrivateKey, destinationAccountId, amountToTransfer) {
	const transferToken = await tokenHandler.transferToken(client, tokenId, client.operatorAccountId, destinationAccountId, amountToTransfer);
	const transferTokenReceipt = await signHandler.signTransaction(transferToken, client, destinationPrivateKey);
	const transferTokenStatus = await transferTokenReceipt.status;
	console.log(`Token ${fairTradeTestToken} :  Transfer ${amountToTransfer} to ${destinationAccountId}.`);
	console.log(transferTokenStatus.toString());
}

async function wipeToken(client, tokenId, destinationAccountId, amountToWipe) {
	const wipeToken = await tokenHandler.wipeToken(client, tokenId, destinationAccountId, amountToWipe);
	const wipeTokenReceipt = await signHandler.signTransaction(wipeToken, client, treasuryKey);
	const wipeTokenStatus = await wipeTokenReceipt.status;
	console.log(`Token ${fairTradeTestToken} :  Wipe ${amountToWipe} to ${destinationAccountId}`);
	console.log(wipeTokenStatus.toString());
}

async function getTokenInfo(tokenId, client) {
	const tokenInfo = await tokenHandler.getTokenInfo(tokenId, client);
}


async function main() {
	await init();

	const tokenId = `YOUR_TOKEN_HERE`;
	
	// Helper functions
	// await createFungibleToken("MyToken", "MT", TokenSupplyType.Infinite, 100000);
	// await mintToken(tokenId, 100000); // Mint more tokens
	// await burnToken(tokenId, 100); // Burn more tokens
	// await getTokenInfo(tokenId, client);
     
	// Associate/transfer to other accounts
	// await associateToken(aliceClient, tokenId, aliceKey);
 	// await transferToken(client, tokenId, aliceKey, aliceClient.operatorAccountId.toString(), 100000);
	// await wipeToken(aliceClient.operatorAccountId, tokenId, client.operatorAccountId.toString(), 10000);
	
	return;
}

main();
