const { 
    AccountCreateTransaction, 
    AccountBalanceQuery, 
    AccountInfoQuery,
    PrivateKey,
    Hbar,
    TransferTransaction
} = require("@hashgraph/sdk");

const clientHandler = require("./clientHandler");

class AccountHandler {

    createAccount = async(privateKey, hbarBalance, client) => {

        const response = await new AccountCreateTransaction()
            .setInitialBalance(hbarBalance)
            .setKey(privateKey.publicKey)
            .setMaxAutomaticTokenAssociations(10)
            .execute(client);
        const receipt = await response.getReceipt(client);
        console.log(`Private Key: ${privateKey}`);
        return [receipt.status, receipt.accountId, privateKey];
    }

    createRandomTestnetAccount = async(initialBalance, eliptical = true) => {
        const client = await clientHandler.getTestnetClient();

        //Create new keys
        const newAccountPrivateKey = eliptical ? PrivateKey.generateED25519() : PrivateKey.generateECDSA();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(initialBalance)
            .execute(client);

        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;

        console.log(`Account ID is:  ${newAccountId}`);
        console.log(`Private Key is : ${newAccountPrivateKey}`);

        //Verify the account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(newAccountId)
            .execute(client);

        console.log(`Current account balance is ${accountBalance}`);

    }

    getAccountBalance = async (client) => {
  
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(client.operatorAccountId.toString())
            .execute(client);

        const accountId = { accountId: `${client.operatorAccountId.toString()}`, balance: `${accountBalance.hbars}` };
        console.table([accountId], ['accountId', 'balance']);
       
        return accountBalance;
    }

    getAccountInfo = async (client, accountId) => {

        const accountInfo = await new AccountInfoQuery()
            .setAccountId(accountId)
            .execute(client);

        const accountInfoData = { 
            accountId: `${accountInfo.accountId}`, 
            contractAccountId: `${accountInfo.contractAccountId}`,
            ethereumNounce: `${accountInfo.ethereumNonce}`,
        };
        console.table([accountInfoData], ['accountId', 'contractAccountId', 'ethereumNounce']);
   
        return accountInfo;
    }

    transferHbar = async (client, sender, receiver, amount) => {

        console.log(`Transfering ${amount} hbars :  ${sender} ->  ${receiver}...`);

        const transferTx = await new TransferTransaction()
		    .addHbarTransfer(sender, new Hbar(-amount))
		    .addHbarTransfer(receiver, new Hbar(amount))
		    .execute(client);

        return transferTx;
    }

}

module.exports = Object.freeze(new AccountHandler());
