console.clear();

const { 
    TopicMessageQuery
} = require("@hashgraph/sdk");


const clientHandler = require('./handlers/clientHandler');
const signHandler = require("./handlers/signHandler");
const topicHandler = require('./handlers/topicHandler');
const testnetPublicTopicId = `0.0.49147835`;
const testnetPrivateTopicId = `0.0.49141614`;

let client;
let treasuryKey;
let anotherAccount;

async function init() {
	client =  await clientHandler.getTestnetClient();
    anotherAccount = await clientHandler.getAliceTestnetClient();
	treasuryKey = await clientHandler.getTestnetPrivateKey();;
}

async function createPublicTopic() {
    const topicCreateTx = await topicHandler.createPublicTopic(client, 'Arkhia memo');
    console.log(`Creating topic with memo "${topicCreateTx.getTopicMemo()}" ...`);
    const signTopicRx = await signHandler.signTransaction(topicCreateTx, client, treasuryKey);

    console.log(`Public Topic ${signTopicRx.topicId} was created successfully with status ${signTopicRx.status}`);
    console.log(`See newly created Topic at @ https://explorer.arkhia.io/#/testnet/topic/${signTopicRx.topicId}`);
    return signTopicRx;
}

async function createPrivateTopic() {
    const topicCreateTx = await topicHandler.createPrivateTopic(client, treasuryKey, 'Arkhia private topic');
    console.log(`Creating topic with memo "${topicCreateTx.getTopicMemo()}" ...`);
    const topicSignRx = await signHandler.signTransaction(topicCreateTx, client, treasuryKey);
    
    console.log(`Private Topic ${topicSignRx.topicId} was created successfully with status ${topicSignRx.status}`);
    console.log(`See newly created Topic at @ https://explorer.arkhia.io/#/testnet/topic/${topicSignRx.topicId}`);
    return topicSignRx;
}

async function createPrivateTopicWithDelete() {
    const topicCreateTx = await topicHandler.createPrivateTopicWithDelete(client, treasuryKey, treasuryKey, 'Arkhia private topic');
    console.log(`Creating topic with memo "${topicCreateTx.getTopicMemo()}" ...`);
    const topicSignRx = await signHandler.signTransaction(topicCreateTx, client, treasuryKey);
    
    console.log(`Private Topic ${topicSignRx.topicId} was created successfully with status ${topicSignRx.status}`);
    console.log(`See newly created Topic at @ https://explorer.arkhia.io/#/testnet/topic/${topicSignRx.topicId}`);
    return topicSignRx;
}

async function submitMessage(clientAccount, topicId, message) {
    const submitMessageTx = await topicHandler.submitTopicMessage(clientAccount, topicId, message);
    console.log(`Submitting to Topic ${topicId} message ${message} TXId :  ${submitMessageTx.transactionId}`);
    console.log(`See message @ https://explorer.arkhia.io/#/testnet/topic/${topicId}`);

    return submitMessageTx;
}

async function deleteTopic(topicId) {
    const deleteTopicTx = await topicHandler.deleteTopic(client, topicId);
    console.log(`Deleting topic ${topicId} ...`);
    const deleteTopicRx = await signHandler.signTransaction(deleteTopicTx, client, treasuryKey);
    console.log(`Topic deleted status : ${deleteTopicRx.status}`);

    return deleteTopicRx;
}

async function getMessageStream(clientAccount, topicId) {
    console.log(`Retrieving messages for ${topicId} :  @ https://explorer.arkhia.io/#/testnet/topic/${topicId}`);
    return new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(clientAccount, (message) => printMessageStream(message));
}

function printMessageStream(message) {
    console.log(Buffer.from(message.contents, "utf8").toString());
}

async function main() {
	await init();
    const aliceClient = await clientHandler.getAliceTestnetClient();
	const aliceKey = await clientHandler.getAliceTestnetPrivateKey();

     //await createPublicTopic();
    // await createPrivateTopic();
    // await createPrivateTopicWithDelete();

    // await submitMessage(client, testnetPublicTopicId, "Hello how are u");
    // await deleteTopic(testnetPrivateTopicId);
    // await getMessageStream(aliceClient, testnetPublicTopicId);
    // console.log(await topicHandler.getTopicInfoById(client, testnetPrivateTopicId));

    return;
}


main();


