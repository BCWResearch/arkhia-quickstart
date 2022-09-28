const { 
    TokenCreateTransaction, 
    TokenType, 
    TokenSupplyType,
    Hbar,
    CustomRoyaltyFee,
    CustomFixedFee,
    TokenMintTransaction,
    TransferTransaction
} = require("@hashgraph/sdk");


class NFTHandler {

    createNFTTokenNoFee = async(privateKey, client, treasuryId, nftInfo) => {
        const createToken = new TokenCreateTransaction()
            .setTokenName(nftInfo.tokenName)
            .setTokenSymbol(nftInfo.tokenSymbol)
            .setTokenType(TokenType.NonFungibleUnique)
            .setInitialSupply(0)
            .setDecimals(0)
            .setMaxSupply(nftInfo.tokenMaxSupply)
            .setTokenMemo(nftInfo.tokenMemo)
            .setTreasuryAccountId(treasuryId)
            .setAdminKey(privateKey)
            .setFreezeKey(privateKey)
            .setPauseKey(privateKey)
            .setSupplyType(TokenSupplyType.Finite)
            .setSupplyKey(privateKey)   // Requirement to be able to mint and burn tokens.
            .setAutoRenewAccountId(treasuryId)  
            .setAutoRenewPeriod(7000000)
            .freezeWith(client);

        return createToken;
    }

    createNFTTokenWithRoyaltyFee = async(privateKey, client, treasuryId, tokenName, tokenSymbol, tokenMemo, tokenMaxSupply, feePercentage) => {
        // Royalty fees are paid by the seller from the amount received
        // Fallback fees are paid by the receiver if no HBAR is exchanged. NFTs with fallback fees must be sent with Secure Trade.
        // Fixed fees are paid by the seller from the amount received
        const nftCustomFee = await new CustomRoyaltyFee()
            .setNumerator(feePercentage)
            .setDenominator(10)
            .setFeeCollectorAccountId(treasuryId)
            .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200))); // large amount

        // https://docs.hedera.com/guides/docs/sdks/deprecated/sdks/tokens/define-a-token
        const createToken = new TokenCreateTransaction()
            .setTokenName(tokenName)
            .setTokenSymbol(tokenSymbol)
            .setTokenType(TokenType.NonFungibleUnique)
            .setInitialSupply(0)
            .setDecimals(0)
            .setCustomFees([nftCustomFee])
            .setMaxSupply(tokenMaxSupply)
            .setTokenMemo(tokenMemo)
            .setTreasuryAccountId(treasuryId)
            .setAdminKey(privateKey)
            .setFreezeKey(privateKey)
            .setPauseKey(privateKey)
            .setSupplyType(TokenSupplyType.Finite)
            .setSupplyKey(privateKey)   // Requirement to be able to mint and burn tokens.
            .setAutoRenewAccountId(treasuryId)  
            .setAutoRenewPeriod(7000000) // not currently enabled, default is 131,500 
            .freezeWith(client);
        return createToken;
    }

    mintNFTToken = async(client, tokenId) => {
        const mintTx = await new TokenMintTransaction()
            .setTokenId(tokenId)
            .setMetadata([Buffer.from(this.getArkhiaIPFSJsonSample())])
            .freezeWith(client);
        return mintTx;
    }

    transferNFTToken = async (client, supplyKey, tokenId, tokenIndex, senderAccountId, receiverAccountId) => {
        let tokenTransferTx = await new TransferTransaction()
            .addNftTransfer(tokenId, tokenIndex, senderAccountId, receiverAccountId)
            .freezeWith(client);
            
        return tokenTransferTx;
    }

    getArkhiaIPFSJsonSample = () => {
        // Json metadata with Arkhia logo, you can create yours as well
        return "https://gateway.pinata.cloud/ipfs/QmaUaC4sdVmWZ6sYMS8w2MjRPAQiHVDZXBR6JxMZa4zAuL";
    }
}

module.exports = Object.freeze(new NFTHandler());

