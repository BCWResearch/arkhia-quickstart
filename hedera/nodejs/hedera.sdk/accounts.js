console.clear();

const { 
    Client, 
	AccountId, 
	PrivateKey, 
	Hbar
} = require("@hashgraph/sdk");

const clientHandler = require('./handlers/clientHandler');
const accountHandler = require('./handlers/accountHandler');

async function main() {
	const client = await clientHandler.getTestnetClient();
	// await accountHandler.getAccountBalance(client);
	// await accountHandler.getAccountInfo(client);
	// await createAccountAlias();
	// await createAccount(client)
	// await createAccountECDSA(client);
}

async function createAccountAlias() {

	const privateKey = PrivateKey.generateECDSA();
	const publicKey = privateKey.publicKey;
	const aliasAccountId = publicKey.toAccountId(0, 0);
	
	const tableData = { alias: aliasAccountId, privateKey: privateKey, metaMaskPrivateKey: privateKey.toStringRaw() };
	console.table([tableData], ['alias', 'privateKey', 'metaMaskPrivateKey']);
	return tableData;
}

async function createAccountECDSA(client) {
	console.log(`- Creating an Hedera account...\n`);
	
	const initBalance = new Hbar(100);
	const privateKey = PrivateKey.generateECDSA();
	const publicKey = privateKey.publicKey;

	const [accountStatus, accountId, accountKey] = await accountHandler.createAccount(privateKey, initBalance, client);
  	console.log(`- View ECDSA Private Key ${privateKey}`);
	console.log(`- Private Key (RAW EVM) ${privateKey.toStringRaw()}`);
	console.log(`- New public key (RAW): 0x${newPublicKey.toStringRaw()} \n`);
	console.log(`- New public key (EVM): 0x${newPublicKey.toEthereumAddress()} \n\n`);
	console.log(`- View ECDSA Account: ${accountId} : https://explorer.arkhia.io/#/testnet/account/${accountId}`);

}

async function createAccount(client) {
	console.log(`- Creating an Hedera account...\n`);
	
	const initBalance = new Hbar(10);
	const privateKey = PrivateKey.generateED25519();
	const publicKey = privateKey.publicKey;

	const [accountStatus, accountId, accountKey] = await accountHandler.createAccount(privateKey, initBalance, client);
	console.log(`- Private Key ${privateKey}`);
	console.log(`- Private Key (RAW EVM) ${privateKey.toStringRaw()}`);
	console.log(`- New public key (RAW): 0x${newPublicKey.toStringRaw()} \n`);
	console.log(`- New public key (EVM): 0x${newPublicKey.toEthereumAddress()} \n\n`);
	console.log(`- View Account: ${accountId} : https://explorer.arkhia.io/#/testnet/account/${accountId}`);
    
}

main();
