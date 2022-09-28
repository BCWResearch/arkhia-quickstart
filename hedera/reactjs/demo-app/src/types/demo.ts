export interface ActionCardContent {
    title: string;
    description: string;
    imageUrl: string;
    demoLink: string;
    exerciseLink: string;
    tutorialLink: string;
}

export interface WalletInfo {
    accountAddress: string;
    balance: string;
}

export interface TopicRecord {
    topicMessage: string;
    topicTimestamp: string;
}

export interface BalanceRecord {
    accountId: string;
    accountBalance: string;
    accountTimestamp: string;
}
