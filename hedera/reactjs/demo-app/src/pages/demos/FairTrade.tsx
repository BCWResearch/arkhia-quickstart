import Intro from '@/components/demo.page/intro';
import WalletIntegration from '@/components/demo.page/wallet.integration';
import ArkhiaDataGrid from '@/components/generic/data.grid';
import FieldLink from '@/components/generic/field.link';
import Subtitle from '@/components/generic/subtitle';
import appConfig from '@/config/appConfig';
import { ContractHandler } from '@/handlers/contract.handler';
import { DataGridService } from '@/handlers/data.grid.service';
import { RestApiService } from '@/handlers/apis/rest.api.service';
import {
    ContractRestApi,
    ContractSolData,
    ContractSolInfo
} from '@/types/contracts';
import { Account } from '@/types/rest.api/accounts';
import { FullToken } from '@/types/rest.api/tokens';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    LinearProgress,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import React, {
    useEffect,
    useState
} from 'react';


export default function FairTrade () {

    const theme = useTheme();
    const treasureIdAccount = appConfig.demoValues.fairTradeValues.ftc_treasury_id;
    const tokenIdAccount = appConfig.demoValues.fairTradeValues.ftc_token_id;
    const contractId = appConfig.demoValues.fairTradeValues.ftc_contract_id;
    
    // wallets
    const [ownerAccount, setOwnerAccount] = useState<Account>();
    const [token, setToken] = useState<FullToken>();

    const [apiContract, setApiContract] = useState<ContractRestApi>();
    const [solContract, setSolContract] = useState<ContractSolData>();
    const [loadingEvmContractData, setLoadingEvmContractData] = useState(false);

    const [errorMessage, setErrorMessage] = useState(``);
    const errorMessageText = `Something went wrong fetching data. Please try again later`;

    const getEvmContractData = async () => {
        try {
            setLoadingEvmContractData(true);
    
            const contractInfo: ContractSolInfo = await ContractHandler.getContractMetadata();
            const contractFairTradeBuyers = await ContractHandler.getFairTradeBuyers();
            const contractBalance = await ContractHandler.getContractBalance();

            const contractSol: ContractSolData = {
                contractInfo,
                contractBalance,
                fairTradeDonators: contractFairTradeBuyers.length > 0 ? contractFairTradeBuyers : []
            };

            setSolContract(contractSol);
            setLoadingEvmContractData(false);

        } catch(e) {
            console.error(e);
            setErrorMessage(errorMessageText);
        }
    };

    const getContractData = async () => {
        try {
            const contractRestApiRequest: ContractRestApi = await RestApiService.getContractById(contractId);
            setApiContract(contractRestApiRequest);
        } catch(e) {
            console.error(e);
            setErrorMessage(errorMessageText);
        }
    };

    const getAccountData = async () => {
        try {
            const accountRequest = await RestApiService.getAccountById(treasureIdAccount);
            setOwnerAccount(accountRequest);
        } catch(e) {
            console.error(e);
            setErrorMessage(errorMessageText);
        }
    };

    const getTokenData = async () => {
        try {
            const tokenRequest = await RestApiService.getTokenById(tokenIdAccount);
            setToken(tokenRequest);
        } catch(e) {
            console.error(e);
            setErrorMessage(errorMessageText);
        }
    };

    const getContractLabel = () => {
        return `Donations so far stored in contract ${apiContract?.contract_id}`;
    };

    const getRemainingBalance = (balance: number) => {
        return balance * 100 / Number(token?.initial_supply);
    };

    useEffect(() => {
        getAccountData();
        getContractData();
        getTokenData();
    }, []);

    return (
   
        <Stack spacing={4}>
            <Stack spacing={4}>

                <Alert severity="warning">
                    This is a demo page running on Hedera Testnet. Do not send real money to this application.
                </Alert>
                {
                    token &&  (
                        <>
                            <Intro tokenName={token.name} tokenSymbol={token.symbol} ></Intro>
                            <Typography variant="h6"> Deposit Hbars for ${token?.name}
                            </Typography>
                            <Divider></Divider>
                            <WalletIntegration tokenName={token?.symbol}  ></WalletIntegration> 
                        </>
                    )
                }

                <Subtitle title='Contract & Token info' />
                <Box display={`flex`} justifyContent={`start`}>
                    {
                        apiContract && ownerAccount && token && (
                            <>
                                <FieldLink label='Contract Id' idValue={apiContract.contract_id} explorerCategory='contract' ></FieldLink>
                                <FieldLink label='Treasury Id' idValue={ownerAccount.account} explorerCategory='account' ></FieldLink>
                                <FieldLink label='Token Id' idValue={tokenIdAccount} explorerCategory='token' ></FieldLink>
                                <FieldLink label='Token Name' idValue={token.symbol} ></FieldLink>
                            </>
                        )
                    }
                </Box>
                <Box>
                    <Box display={`flex`} justifyContent={`center`}>
                        {
                            loadingEvmContractData ? <CircularProgress></CircularProgress> :
                                <Button onClick={getEvmContractData}>Load EVM Contract Data</Button>
                        }
                        
                    </Box>
                
                    <Box>
                        {
                            solContract && token && (
                                <>
                                    <Box display={'flex'} justifyContent={'initial'} sx={{marginBottom:theme.spacing(2)}}>
                                        <FieldLink label='Contract Hbar' idValue={String(solContract.contractBalance)}></FieldLink>
                                        <LinearProgress
                                            variant="determinate"
                                            value={getRemainingBalance(solContract.contractBalance)}
                                            sx={{
                                                height:`10px`, width:`80%`, margin: theme.spacing(3,2)
                                            }}
                                        />
                                    </Box>
                                    <Box display={'flex'} justifyContent={'initial'} sx={{marginBottom:theme.spacing(2)}}>
                                        <FieldLink label='Contract Tokens' idValue={solContract.contractInfo.tokenSupply}></FieldLink>
                                        
                                        <LinearProgress
                                            variant="determinate"
                                            value={getRemainingBalance(Number(solContract.contractInfo.tokenSupply))}
                                            sx={{
                                                height:`10px`, width:`80%`, margin: theme.spacing(3,2)
                                            }}
                                        />
                                    </Box>
                               
                                </>
                            )
                        }
                    </Box>
                    <Box>
                   
                        {
                            solContract?.fairTradeDonators && solContract?.fairTradeDonators.length > 0 && apiContract && (
                                <>
                                    <ArkhiaDataGrid
                                        minHeight='250px'
                                        extraInfo={getContractLabel()}
                                        rowsData={DataGridService.getContractDonators(solContract?.fairTradeDonators)}
                                        columnDef={DataGridService.getContractDonatorsColumns()}
                                    />
                                </>
                            )
                        }
                    </Box>
                </Box>
                <Box sx={{marginTop: theme.spacing(5)}}>
                    <Divider></Divider>
                    <Typography>Arkhia 2023</Typography>
                </Box>
            </Stack>
        </Stack>
    );
}
