class SignHandler {

    signTransaction = async(signObject, client, privateKey) => {
        try {
            const createSigned = await signObject.sign(privateKey);
            const createTransaction = await createSigned.execute(client);
            const createTransactionReceipt = await createTransaction.getReceipt(client);
            console.log(`Receipt created successfully`);
            return createTransactionReceipt;

        } catch (e) {
            console.log(`Something went wrong`);
            console.log(e);
            throw e;
        }
    }
}

module.exports = Object.freeze(new SignHandler());
