import appConfig from "@/config/appConfig";
import {
    AccountId,
    Client,
    PrivateKey,
    TopicMessageSubmitTransaction
} from "@hashgraph/sdk";
import { ClientHandler } from "./client.handler";

const submitMessageTopic = async (name: string, message: string, value: string) => {

    const client =  await ClientHandler.getClientTestnet();
    const submitMessageTx = await new TopicMessageSubmitTransaction({
        topicId: appConfig.demoValues.fairTradeValues.ftc_topic_id,
        message: `${name} : ${message} Thank you for your donation of ${value}!` ,
    }).execute(client);

    console.log(submitMessageTx);
    return submitMessageTx;
};

export const TopicHandler = { submitMessageTopic };
