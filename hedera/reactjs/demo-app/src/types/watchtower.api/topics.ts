export interface SubscribeTopicsPayload {
    consensusStartTime: ConsensusStartTime;
    limit: string;
    topicID: TopicID;
}
export interface TopicID {
    realmNum: string;
    shardNum: string;
    topicNum: string;
}
export interface ConsensusStartTime {
    nanos: number;
    seconds: string;
}
