
const fs = require("fs");
const SolidityTypes = require('../constants/solidity');
const {
	FileCreateTransaction,
    FileAppendTransaction,
	ContractCreateTransaction,
    ContractUpdateTransaction,
	ContractCallQuery,
	Hbar,
    ContractInfoQuery,
} = require("@hashgraph/sdk");


class ContractHandler {

    deployContract = async (bytecodeFileId, contractFunctionParameters, client) => {

        const contractInstantiateTx = new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(300000)
            .setConstructorParameters(contractFunctionParameters)
            .freezeWith(client);
        return contractInstantiateTx;

    }

    setKeylessContract = async() => {

        const contractKeyless = await new ContractUpdateTransaction()
            .setContractId(contractId)
            .setAdminKey(new KeyList())
            .freezeWith(client)
            .sign(adminKey);
        return contractKeyless;

    }

    addBigContractFile = async (pathToBinFile, maxTransactionFee, operatorKey, client) => {

        try {
            const bigBytecode = fs.readFileSync(pathToBinFile);
            const fileCreateTx = new FileCreateTransaction()
                .setKeys([operatorKey])
                .freezeWith(client);

            const fileSubmit = await fileCreateTx.execute(client);
            const fileCreateRx = await fileSubmit.getReceipt(client);
            const bytecodeFileId = fileCreateRx.fileId;

            // Append contents to the file // signing
            const fileAppendTx = new FileAppendTransaction()
                .setFileId(bytecodeFileId)
                .setContents(bigBytecode)
                .setMaxChunks(10)
                .setMaxTransactionFee(new Hbar(maxTransactionFee))
                .freezeWith(client);
            const fileAppendSubmit = await fileAppendTx.execute(client);
            const fileAppendRx = await fileAppendSubmit.getReceipt(client);
            return { bytecodeFileId : bytecodeFileId , status: fileAppendRx.status };

        } catch (e) {
            console.log(`Something went wrong with deploying the contract.`);
            console.log(e);
            throw e;
        }
    }

    addSmallContractFile = async (pathToBinFile, maxTransactionFee, operatorKey, client) => {
        try {
            const contractBytecode = fs.readFileSync(pathToBinFile);
            // Create a file on Hedera and store the bytecode
            const fileCreateTx = new FileCreateTransaction()
                .setContents(contractBytecode)
                .setKeys([operatorKey])
                .setMaxTransactionFee(new Hbar(maxTransactionFee))
                .freezeWith(client);
            return fileCreateTx;

        } catch (e) {
            console.log(`Something went wrong with deploying the contract.`);
            console.log(e);
            throw e;
        }
    }

    getContractCallQuery = async(client, contractId, methodName, type) => {
        try {
            const contractTx = new ContractCallQuery()
                .setContractId(contractId)
                .setGas(200000)
                .setFunction(methodName);
            const contractExecSubmit = await contractTx.execute(client);
            let message = ``;

            if (type === SolidityTypes.String) message = await contractExecSubmit.getString(0);
            else if (type === SolidityTypes.Number256) message = await contractExecSubmit.getUint256(0);
            else if (type === SolidityTypes.Address) message = await contractExecSubmit.getAddress(0);

            const gasUsed = contractExecSubmit.gasUsed.toNumber();
            const usdCost = gasUsed * (0.000_000_0569/1) + '$';

            const contractTable = ['contractId', 'gasUsed', 'gasUsd', 'method', 'value'];
            const contractData = { 
                contractId: contractId.toString(), 
                expirationDate: contractExecSubmit.expirationDate,
                gasUsed: contractExecSubmit.gasUsed.toNumber(),
                gasUsd: usdCost,
                method: methodName, 
                value: message.toString()
            };

            if (type === SolidityTypes.Address) {
                contractData.hederaId = await contractExecSubmit.getUint256(0).toString();
                contractTable.push('hederaId');
            }
            console.table([contractData], contractTable);
            return message;        
        } catch (e) {
            console.log(`Something is wrong with querying the contract ${contractId} / method ${methodName}`);
            console.log(e);
            throw e;
        }
    }

    getContractTokenBalance = async (client, contractId, tokenId) => {

        const contractQuery = new ContractInfoQuery().setContractId(contractId);
        const contractInfo = await contractQuery.execute(client);
        const tokenBalance = contractInfo.tokenRelationships.get(tokenId).balance / 100;

        console.log(`The contract token balance for ${tokenId} is ${tokenBalance}`);
        return tokenBalance;
    }
}

module.exports = Object.freeze(new ContractHandler());
