export  interface FileID {
    'shardNum'?: (number | string | Long);
    'realmNum'?: (number | string | Long);
    'fileNum'?: (number | string | Long);
}

export interface GetNodesQuery {
    'fileId'?: (FileID | null);
    'limit'?: (number);
}

export interface SubscribeGetNodesPayload {
    subscribe: string;
    body: GetNodesQuery;
}