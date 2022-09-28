console.clear();
const { 
    TopicMessageQuery
} = require("@hashgraph/sdk");


const clientHandler = require('../../hedera.sdk/handlers/clientHandler');
const signatureHandler = require('../../hedera.sdk/handlers/signHandler');
const topicHandler = require('../../hedera.sdk/handlers/topicHandler');

async function getMessageStream(clientAccount, topicId) {
    console.log(`Retrieving messages for ${topicId}: @ https://explorer.arkhia.io/#/testnet/topic/${topicId}`);
    return new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(clientAccount, (message) => console.log(Buffer.from(message.contents, "utf8").toString()));
}

async function main() {
    // Init clients/users
    const client = await clientHandler.getTestnetClient();
    const treasuryKey = await clientHandler.getTestnetPrivateKey();

    // Create Private Topic
    //const topicTx = await topicHandler.createPrivateTopic(client, treasuryKey, "Private topic for safe keeping data.");
    //const topicRx = await signatureHandler.signTransaction(topicTx, client, treasuryKey);
    //console.log(`Private Topic ${topicRx.topicId} was created successfully with status ${topicRx.status}`);
    
    // Create TOPIC with name/message
    const messageResult = await topicHandler.submitTopicMessage(client, `0.0.3493291`, `And that's a wrap for watchtower`);
    console.log(`Message submitted`);

    //See TOPIC messages
    //await getMessageStream(client,  topicRx.topicId);
}

main();
