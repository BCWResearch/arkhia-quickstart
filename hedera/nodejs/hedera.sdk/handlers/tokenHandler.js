const { 
    TokenCreateTransaction, 
    TokenType, 
    Hbar, 
    TokenInfoQuery,
    TokenMintTransaction,
    TokenBurnTransaction,
    TokenAssociateTransaction,
    TransferTransaction,
    TokenWipeTransaction,
    TokenUpdateTransaction,
    AccountInfoQuery
} = require("@hashgraph/sdk");


class TokenHandler {

     createFungibleToken = async(privateKey, client, treasuryId, tokenName, tokenSymbol, supplyType, initialSupply ) => {
        // Infinite fungible token
        const createToken = new TokenCreateTransaction()
            .setTokenName(tokenName)
            .setTokenSymbol(tokenSymbol)
            .setTokenType(TokenType.FungibleCommon)
            .setInitialSupply(initialSupply)
            .setDecimals(2)
            .setTreasuryAccountId(treasuryId)
            .setSupplyType(supplyType)
            .setSupplyKey(privateKey) // mints the tokens
            .setAutoRenewAccountId(treasuryId)  // takes the costs of auto renew the token (max 9 months)
            .setAutoRenewPeriod(7000000)
            .setWipeKey(privateKey)
            .setMaxTransactionFee(new Hbar(30)) // at least 30
            .freezeWith(client);

        return createToken;
    }

    getTokenInfo = async(tokenId, client) => {

        const tokenInfoQuery = new TokenInfoQuery()
            .setTokenId(tokenId);
        const tokenInfo = (await tokenInfoQuery.execute(client));

        console.log(`Token Symbol : ${tokenInfo.symbol}`);
        console.log(`Token Name : ${tokenInfo.name}`);
        console.log(`Token Total Supply : ${tokenInfo.totalSupply}`);
        console.log(`Token ID Solidity address : ${tokenInfo.tokenId.toSolidityAddress()}`);

        return tokenInfo;
    }

    mintFungibleToken = async (tokenId, amount, client) => {

        const mintToken = new TokenMintTransaction()
            .setTokenId(tokenId)
            .setAmount(amount)
            .freezeWith(client);

        return mintToken;
    }

    burnFungibleToken = async (tokenId, amount, client) => {

        const burnToken = new TokenBurnTransaction()
            .setTokenId(tokenId)
            .setAmount(amount)
            .freezeWith(client);

        return burnToken;
    }

    updateTokenTransaction = async(client, treasureKey, tokenId, supplyKey) => {

        const tokenUpdateTx = await new TokenUpdateTransaction()
            .setTokenId(tokenId)
            .setSupplyKey(supplyKey)
            .freezeWith(client)
            .sign(treasureKey);

        return tokenUpdateTx;
    }

    // Receiver has to pay a $fee to get the token
    // Redo triggers TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT
    associateToken = async (tokenIds, accountId, client) => {

        const associateToken = new TokenAssociateTransaction()
            .setAccountId(accountId)
            .setTokenIds(tokenIds)
            .execute(client);

        return associateToken;
    }

    transferToken = async (client, tokenId, treasuryId, destinationId, amount) => {

        const transferToken = new TransferTransaction()
            .addTokenTransfer(tokenId, treasuryId, -(amount))
            .addTokenTransfer(tokenId, destinationId, amount)
            .freezeWith(client);

        return transferToken;
    }   
    
    wipeToken = async (treasuryClient, tokenId, accountId, amount) => {

        const wipeToken = new TokenWipeTransaction()
            .setAccountId(accountId)
            .setTokenId(tokenId)
            .setAmount(amount)
            .freezeWith(treasuryClient);

        return wipeToken;
    }

    getClientTokenBalance = async (client,tokenId) => {
 
        const accountId = client.operatorAccountId.toString();
        const accountQuery = new AccountInfoQuery().setAccountId(accountId);
        const accountInfo = await accountQuery.execute(client);
        const balance = accountInfo.tokenRelationships.get(tokenId).balance / 100;
    
        console.log(`Token Balance (${tokenId}) for account ${accountId} is : ${balance}`);
        return balance;
    }
    
}

module.exports = Object.freeze(new TokenHandler());

