
const fs = require("fs");
const SolidityTypes = {
    String: 'String',
    Number256: 'Number256',
    Address: 'Address',
};

const {
	FileCreateTransaction,
    FileAppendTransaction,
	ContractCreateTransaction,
    ContractUpdateTransaction,
	ContractCallQuery,
	Hbar,
    ContractInfoQuery,
} = require("@hashgraph/sdk");


    
class ContractUtils {

    deployContractFile = async (client, operatorKey , pathToBinFile, maxTransactionFee, maxChunks) => {

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
                .setMaxChunks(maxChunks)
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

    deployContractEvm = async (client, bytecodeFileId, contractFunctionParameters) => {
        const contractInstantiateTx = new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(300000)
            .setConstructorParameters(contractFunctionParameters)
            .freezeWith(client);
        return contractInstantiateTx;
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
}

module.exports = Object.freeze(new ContractUtils());
