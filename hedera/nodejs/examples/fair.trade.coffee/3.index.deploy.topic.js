console.clear();

const clientHandler = require('../../hedera.sdk/handlers/clientHandler');
const signatureHandler = require('../../hedera.sdk/handlers/signHandler');
const topicHandler = require('../../hedera.sdk/handlers/topicHandler');

async function main() {
    // Init clients/users
    const client = await clientHandler.getTestnetClient();
    const treasuryKey = await clientHandler.getTestnetPrivateKey();

    // Create Private Topic
    const topicTx = await topicHandler.createPrivateTopic(client, treasuryKey, "Arkhia FairTrade Coffee experience");
    const topicRx = await signatureHandler.signTransaction(topicTx, client, treasuryKey);
    console.log(`Private Topic ${topicRx.topicId} was created successfully with status ${topicRx.status}`);
    

    // Create TOPIC with name/message
    const messageResult = await topicHandler.submitTopicMessage(client, topicRx.topicId, `Arkhia Treasury : All donations will be kept here for safe keeping :)`);
    console.log(`See Topic at @ https://explorer.arkhia.io/#/testnet/topic/${topicRx.topicId}\n`);
}

main();
