import { SubscribeTopicsPayload } from "@/types/watchtower.api/topics";

const subscribeTopicRoute: string = `/com.hedera.mirror.api.proto.ConsensusService/subscribeTopic`;
const subscribeAccountBalanceRoute: string = `/proto.CryptoService/cryptoGetBalance`;
 
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


const getAccountSubscriptionPayload =  (accountNum: string) => {
    const subscriptionPayload = {
        subscribe: subscribeAccountBalanceRoute,
        body: {
        cryptogetAccountBalance: {
          header: {
            responseType: 0,
          },
          accountID: {
            accountNum: accountNum,
            realmNum: '0',
            shardNum: '0',
          },
        },
      },
      pollingInterval: '5s', // polling interval is optional
    };
    return subscriptionPayload;
};

export const WatchtowerService = {
    getTopicSubscriptionPayload,
    getAccountSubscriptionPayload
};
