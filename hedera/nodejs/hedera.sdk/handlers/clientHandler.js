const { 
    Client, AccountId, PrivateKey, Hbar
} = require("@hashgraph/sdk");


require('dotenv').config({path: '../../.env'})

class ClientHandler {

    getRandomTestnetClient = async(operatorId, operatorPrivateKey) => {
        try {
            const accountOperatorId = AccountId.fromString(operatorId);
            const accountOperatorKey = PrivateKey.fromString(operatorPrivateKey);
            const client = Client.forTestnet().setOperator(accountOperatorId, accountOperatorKey);
            return client;

        } catch (e) {
            console.log(`Something went wrong in fetching Root testnet client.`);
            console.log(e);
            throw e;
        }
    }

    getTestnetClientECDSA = async() => {
        try {
            const operatorId = AccountId.fromString(process.env.OPERATOR_ID_ECDSA);
            const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY_ECDSA);
            const client = Client.forTestnet().setOperator(operatorId, operatorKey);
            return client;

        } catch (e) {
            console.log(`Something went wrong in fetching Root ECDSA testnet client.`);
            console.log(e);
            throw e;
        }
    }


    getTestnetPrivateKeyECDSA = async () => {
        try {
            return PrivateKey.fromString(process.env.OPERATOR_PVKEY_ECDSA);
        } catch (e) {
            console.log(`Something went wrong in fetching the key from ${process.env.OPERATOR_PVKEY_ESA}`);
            console.log(e);
            throw e;
        }
    }

    getTestnetClient = async() => {
        try {
            const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
            const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
            const client = Client.forTestnet().setOperator(operatorId, operatorKey);
            return client;

        } catch (e) {
            console.log(`Something went wrong in fetching Root testnet client.`);
            console.log(e);
            throw e;
        }
    }


    getTestnetPrivateKey = async () => {
        try {
            return PrivateKey.fromString(process.env.OPERATOR_PVKEY);
        } catch (e) {
            console.log(`Something went wrong in fetching the key from ${process.env.OPERATOR_ID}`);
            console.log(e);
            throw e;
        }
    }

    getAliceTestnetClient =  async() => {
        try {
            const operatorId = AccountId.fromString(process.env.ALICE_ID);
            const operatorKey = PrivateKey.fromString(process.env.ALICE_PVKEY);
            const client = Client.forTestnet().setOperator(operatorId, operatorKey);
            client.setDefaultMaxTransactionFee(new Hbar(100));
            return client;

        } catch (e) {
            console.log(`Something went wrong in fetching Alice testnet client.`);
            console.log(e);
            throw e;
        }
    }

    getAliceTestnetPrivateKey = async() => {
        try {
            return PrivateKey.fromString(process.env.ALICE_PVKEY);
        } catch (e) {
            console.log(`Something went wrong`);
            console.log(e);
            throw e;
        }
    }

    getBobTestnetClient =  async() => {
        try {
            const operatorId = AccountId.fromString(process.env.BOB_ID);
            const operatorKey = PrivateKey.fromString(process.env.BOB_PVKEY);
            const client = Client.forTestnet().setOperator(operatorId, operatorKey);
            client.setDefaultMaxTransactionFee(new Hbar(100));
            return client;

        } catch (e) {
            console.log(`Something went wrong in fetching Bob testnet client.`);
            console.log(e);
            throw e;
        }
    }
}

module.exports = Object.freeze(new ClientHandler());
