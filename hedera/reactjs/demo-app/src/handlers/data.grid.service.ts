
import { ContractSolDataDonators } from '@/types/contracts';
import { BalanceRecord, TopicRecord } from '@/types/demo';
import { Account } from '@/types/rest.api/accounts';
import { NFT } from '@/types/rest.api/nft';
import { FullToken } from '@/types/rest.api/tokens';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const getDateFromTimeStamp = (timestamp: string) => {
    const created_at_parsed = Math.round(Number(timestamp) * 1000);
    const date = new Date(created_at_parsed);
    return `${date.toDateString()}  ${date.getHours()}:${date.getMinutes()}`;
};

const getAccountData = (account: Account) => {
    const accountsRows: GridRowsProp = [
        {
            id: 1, alias: account.alias, balance: account.balance.balance
        }
    ];
    return accountsRows;
};

const getTokenData = (token: FullToken) => {
    const accountsRows: GridRowsProp = [
        {
            id: 1,
            token_id: token.token_id,
            symbol: token.symbol,
            name: token.name,
            initial_supply: token.initial_supply,
            total_supply: token.total_supply,
            max_supply: token.max_supply,
            created_at: getDateFromTimeStamp(token.created_timestamp),
            modified_at: getDateFromTimeStamp(token.modified_timestamp),
        }
    ];
    return accountsRows;

};

const getNftData = (nfts: NFT[]) => {
    const nftRows: any = [];
    let index = 1;

    for (const nft of nfts) {
        nftRows[index-1] = {
            id: index,
            account_id: nft.account_id,
            token_id: nft.token_id,
            serial_number: nft.serial_number,
            created_at: getDateFromTimeStamp(nft.created_timestamp),
            modified_at: getDateFromTimeStamp(nft.modified_timestamp),
        };
        index++;
    }

    return nftRows;
};

const getContractDonators = (contractDonators: ContractSolDataDonators[]) => {
    const contractDonatorsGrid: any = [];

    let index = 1;

    for (const contractDonator of contractDonators) {

        contractDonatorsGrid[index-1] = {
            id: index,
            name: contractDonator.name,
            message: contractDonator.message,
            amount: contractDonator.amount,
            from: contractDonator.from,
            timestamp: contractDonator.timestamp
        };
        index++;
    }

    return contractDonatorsGrid;
};

const getContractDonatorsColumns = () : GridColDef[] => {
    const accountColumns: GridColDef[] = [
        {
            field: `name`, headerName: `Name`, width: 200,
        },
        {
            field: `message`, headerName: `Message`, width: 200
        },
        {
            field: `amount`, headerName: `Amount`, width: 200
        },
        {
            field: `from`, headerName: `From`, width: 200
        },
        {
            field: `timestamp`, headerName: `Timestamp`, width: 200
        },
    ];
    return accountColumns;
};

const getAccountColumns = () : GridColDef[] => {
    const accountColumns: GridColDef[] = [
        {
            field: `account_id`, headerName: `Account Associated`, width: 200,
        },
        {
            field: `alias`, headerName: `Alias`, width: 200
        },
    ];
    return accountColumns;
};

const getTokenColumns = () : GridColDef[] => {
    const tokenColumns: GridColDef[] = [
        {
            field: `token_id`, headerName: `Token Id`, width: 150
        },
        {
            field: `symbol`, headerName: `Symbol`, width: 150
        },
        {
            field: `name`, headerName: `Name`, width: 150
        },
        {
            field: `initial_supply`, headerName: `Initial Supply`, width: 150
        },
        {
            field: `total_supply`, headerName: `Total Supply`, width: 150
        },
        {
            field: `max_supply`, headerName: `Max Supply`, width: 150
        },
        {
            field: `created_at`, headerName: `Created`, width: 200
        },
        {
            field: `modified_at`, headerName: `Modified `, width: 200
        },
    ];
    return tokenColumns;
};

const getNftColumns = () : GridColDef[] => {
    const nftColumns: GridColDef[] = [
        {
            field: `account_id`, headerName: `Account Associated`, width: 150
        },
        {
            field: `token_id`, headerName: `Token Id`, width: 200
        },
        {
            field: `serial_number`, headerName: `Serial Number`, width: 150
        },
        {
            field: `created_at`, headerName: `Created`, width: 200
        },
        {
            field: `modified_at`, headerName: `Modified `, width: 200
        },
    ];
    return nftColumns;
};

const getAccountWatchtowerColumns = () : GridColDef[] => {
    const ledgerColumns: GridColDef[] = [
        {
            field: `account_id`, headerName: `Account Id`, width:200
        },
        {
            field: `balance`, headerName: `Balance`, width:200
        },
        {
            field: `timestamp`, headerName: `Time`, width:400
        },
    ];
    return ledgerColumns;
};


const getAccountWatchtowerData = (messageCollection: Array<BalanceRecord>) => {
    const messageRows: any = [];
    let index = 1;
    for (const message of messageCollection) {
        messageRows[index-1] = {
            id: index,
            account_id: message.accountId,
            balance: message.accountBalance,
            timestamp: message.accountTimestamp,
        };
        index++;
    }
    return messageRows;
};

const getLedgerColumns = () : GridColDef[] => {
    const ledgerColumns: GridColDef[] = [
        {
            field: `timestamp`, headerName: `Time`, width:200
        },
        {
            field: `message`, headerName: `Message`, width:800
        },
    ];
    return ledgerColumns;
};

const getLedgerData = (messageCollection: Array<TopicRecord>) => {
    const messageRows: any = [];
    let index = 1;
    for (const message of messageCollection) {
        messageRows[index-1] = {
            id: index,
            message: message.topicMessage,
            timestamp: getDateFromTimeStamp(message.topicTimestamp),
        };
        index++;
    }
    return messageRows;
};

export const DataGridService = {
    getAccountColumns,
    getAccountData,
    getNftColumns,
    getNftData,
    getTokenColumns,
    getTokenData,
    getContractDonatorsColumns,
    getContractDonators,
    getLedgerColumns,
    getLedgerData,
    getAccountWatchtowerColumns,
    getAccountWatchtowerData
};
