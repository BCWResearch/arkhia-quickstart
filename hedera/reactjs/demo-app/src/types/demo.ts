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

export interface CoffeeDonationRecord {
    topicMessage: string;
    topicTimestamp: string;
}
