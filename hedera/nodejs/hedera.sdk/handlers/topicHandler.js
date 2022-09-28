const { 
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    TopicDeleteTransaction,
    TopicInfoQuery
} = require("@hashgraph/sdk");


require("dotenv").config();

class TopicHandler {

    getTopicInfoById = async(client, topicId) => {
        const topicInfoTx = new TopicInfoQuery()
            .setTopicId(topicId);
        const info = await topicInfoTx.execute(client);

        return info;
    }

    deleteTopic = async(client, topicId) => {
        const deleteTopicTx = new TopicDeleteTransaction()
            .setTopicId(topicId)
            .freezeWith(client);

        return deleteTopicTx;
    }

    createPublicTopic = async(client, topicMemo) => {
        const publicTopic = new TopicCreateTransaction()
            .setTransactionMemo(topicMemo)
            .setTopicMemo(topicMemo)
            .freezeWith(client);

        return publicTopic;
    }

    createPrivateTopic = async(client, submitKey, topicMemo) => {
        const privateTopic = new TopicCreateTransaction()
            .setSubmitKey(submitKey)
            .setTransactionMemo(topicMemo)
            .setTopicMemo(topicMemo)
            .freezeWith(client);

        return privateTopic;
    }

    createPrivateTopicWithDelete = async(client, adminKey, submitKey, topicMemo) => {
        const privateTopic = new TopicCreateTransaction()
            .setAdminKey(adminKey)
            .setSubmitKey(submitKey)
            .setTransactionMemo(topicMemo)
            .setTopicMemo(topicMemo)
            .freezeWith(client);

        return privateTopic;
    }

    submitTopicMessage = async(client, topicId, message) => {
        const submitMessageTx = new TopicMessageSubmitTransaction({
            topicId: topicId,
            message: message, // string, (ByteString or byte[]) -> protobuf
        }).execute(client);

        return submitMessageTx;
    }
}

module.exports = Object.freeze(new TopicHandler());
