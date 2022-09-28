console.clear();


const { 
    ContractFunctionParameters, 
    Hbar, 
    ContractExecuteTransaction,
    TokenId, 
    Client
} = require('@hashgraph/sdk');


const clientHandler = require('./hedera.sdk/handlers/clientHandler');


async function main() {
    // Init clients/users
    const treasuryClient = await clientHandler.getTestnetClient();
    const treasuryKey = await clientHandler.getTestnetPrivateKey();

    console.log(`Client exists successfully: Account id ${treasuryClient.operatorAccountId.toString()}`);
    console.log(`Client treasure key exists successfully: Account id ${treasuryKey.toString()}`);
}

main();
