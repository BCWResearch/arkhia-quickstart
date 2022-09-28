console.clear();

const clientHandler = require('../../hedera.sdk/handlers/clientHandler');
const signatureHandler = require('../../hedera.sdk/handlers/signHandler');
const nftHandler = require('../../hedera.sdk/handlers/nftHandler');

async function createAndMintNft(client, treasuryKey, nftInfo) {

    // Create and Mint NFT Token
	const nftTokenTx = await nftHandler.createNFTTokenNoFee(
		treasuryKey,
		client,
        client.operatorAccountId,
        nftInfo
    );
	const nftTokenRx = await signatureHandler.signTransaction(nftTokenTx, client, treasuryKey);
    const nftTokenId = await nftTokenRx.tokenId.toString();

	console.log(`NFT successfully created: ${nftTokenId} by account ${client.operatorAccountId}`);
    console.log(`See NFT @ https://explorer.arkhia.io/#/testnet/token/${nftTokenRx.tokenId.toString()}\n`);

    const indexes = [];
    // Mint NFT 
    for (let i=0; i< nftInfo.tokenMaxSupply ; i++) {
        const mintTokenTx = await nftHandler.mintNFTToken(client, nftTokenId);
        const mintTokenRx = await signatureHandler.signTransaction(mintTokenTx, client, treasuryKey);
        const nftIndex = mintTokenRx.serials[0].low;
        indexes.push(nftIndex);
        console.log(`Minted nft ${nftIndex} from ${nftTokenId} successful`);
    }

    return {
        nftId: nftTokenId,
        minted: indexes
    };
}

async function transferNft(client, clientKey, nftId, nftIndex, senderId, receiverId) {

    console.log(`Transfer nft ${nftId} : ${nftIndex} from ${senderId} to account ${receiverId}...`);
    const transferNftTx = await nftHandler
        .transferNFTToken(client, clientKey, nftId, nftIndex, senderId, receiverId);

    let tokenTransferSubmit = await transferNftTx.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
    console.log(`NFT Token transfer status : ${tokenTransferRx.status}`);
    return tokenTransferRx;
}

async function main() {
    // Init clients/users
    const client = await clientHandler.getTestnetClient();
    const treasuryKey = await clientHandler.getTestnetPrivateKey();
    //
    const aliceClient = await clientHandler.getAliceTestnetClient();

    // Set nft fairtrade data
    const nftInfo = { 
        tokenName: "FairTrade_NFT", 
        tokenSymbol: "FTNFT", 
        tokenMemo: "A gift for your contribution", 
        tokenMaxSupply: 10 
    };

    // Create Coffee NFTS
    const createResult = await createAndMintNft(client, treasuryKey, nftInfo);
    console.log(`\n Nfts created and minted`);
    console.log(createResult);

    // Associate NFTs
    // example nftId: '0.0.49225600',
    // const transferResult = await transferNft(client, treasuryKey, `0.0.49225600`, 1, client.operatorAccountId.toString(), aliceClient.operatorAccountId.toString());
    // console.log(`Transfer result`);
    // console.log(transferResult);
}

main();
