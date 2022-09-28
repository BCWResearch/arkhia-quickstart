import { SubscribeTopicsPayload } from "@/types/watchtower.api/topics";

const subscribeTopicRoute: string = `/com.hedera.mirror.api.proto.ConsensusService/subscribeTopic`;
 
const getTopicSubscriptionPayload =  (topic_id: string, limit: string) => {
    const payload: SubscribeTopicsPayload = {
        consensusStartTime: {
            nanos: 0,
            seconds: `0`
        },
        limit: limit,
        topicID: {
            realmNum: `0`,
            shardNum: `0`,
            topicNum: topic_id
        }
    }
    const subscriptionPayload = {
        subscribe: subscribeTopicRoute,
        body :  payload
    };

    return subscriptionPayload;
};

export const WatchtowerService = {
    getTopicSubscriptionPayload
};
