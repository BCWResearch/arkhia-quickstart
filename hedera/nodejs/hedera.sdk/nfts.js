console.clear();

const clientHandler = require('./handlers/clientHandler');
const nftHandler = require('./handlers/nftHandler');
const signHandler = require("./handlers/signHandler");
const tokenHandler = require('./handlers/tokenHandler');
const arkhiaNftId = `0.0.49139563`;

let client;
let treasuryKey;
let aliceClient;

async function init() {
    client =  await clientHandler.getTestnetClient();
	treasuryKey = await clientHandler.getTestnetPrivateKey();;
    aliceClient = await clientHandler.getAliceTestnetClient();
}

async function createNftWithoutFee(client, treasuryKey, nftInfo) {
	// Create initial token
	const nftToken = await nftHandler.createNFTTokenNoFee(
		treasuryKey,
		client,
        client.operatorAccountId,
        nftInfo
    );

	const nftTokenTX = await signHandler.signTransaction(nftToken, client, treasuryKey);
	console.log(`NFT successfully created: ${nftTokenTX.tokenId.num} by account ${client.operatorAccountId}`);
    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/token/0.0.${nftTokenTX.tokenId.num}`);
}

async function createNftWithFee() {
	// Create initial token
	const nftToken = await nftHandler.createNFTTokenWithRoyaltyFee(
		treasuryKey,
		client,
        client.operatorAccountId,
		"Arkhia.Black", 
		"ARK",
        "Arkhia Dev NFT",
        10, // max Supply
        2, // Royalty fee 20%
    );

	const nftTokenTX = await signHandler.signTransaction(nftToken, client, treasuryKey);
	console.log(`NFT successfully created: ${nftTokenTX.tokenId.num}`);
    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/token/0.0.${nftTokenTX.tokenId.num}`);
}

async function mintNftToken(client, supplyKey, nftId) {
    const mintTokenTx = await nftHandler.mintNFTToken(client, nftId);
    const nftTokenRx = await signHandler.signTransaction(mintTokenTx, client, supplyKey);
	console.log(`NFT ${nftId} successfully minted with index: ${nftTokenRx.serials[0].low}`);

    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/token/${nftId}`);
}

async function transferNftToken(client, supplyKey, nftId, nftIndex, senderId, destinationId) {
    console.log(`Attempting to transfer nft ${arkhiaNftId} mint version ${nftIndex} to account ${senderId}...`);
    const transferNftTx = await nftHandler
        .transferNFTToken(client, supplyKey, nftId, nftIndex, senderId, destinationId);

    let tokenTransferSubmit = await transferNftTx.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

    console.log(`\n NFT transfer ${senderId} -> ${destinationId} status: ${tokenTransferRx.status} \n`);
}

async function main() {
    await init();
    const nftInfo = { 
        tokenName: "FairTrade_NFT", tokenSymbol: "FTNFT", 
        tokenMemo: "A gift for your contribution", tokenMaxSupply: 10 
    };
    await createNftWithoutFee(client, treasuryKey, nftInfo);
    // await mintNftToken(client, treasuryKey, arkhiaNftId);
    // await transferNftToken(client, treasuryKey, arkhiaNftId, 1, client.operatorAccountId, client.operatorAccountId);
	
	return;
}


main();


