import Intro from '@/components/demo.page/intro';
import WalletIntegration from '@/components/demo.page/wallet.integration';
import ArkhiaDataGrid from '@/components/generic/data.grid';
import FieldLink from '@/components/generic/field.link';
import Subtitle from '@/components/generic/subtitle';
import appConfig from '@/config/appConfig';
import { hederaItemsDemo } from '@/config/hederaItems';
import { ContractHandlerDemo } from '@/demo.to.fill/contract.handler.demo';
import { ContractRestApiDemo } from '@/demo.to.fill/contracts.demo';
import { RestApiServiceDemo } from '@/demo.to.fill/rest.api.service.demo';
import { DataGridService } from '@/handlers/data.grid.service';
import { RestApiService } from '@/handlers/apis/rest.api.service';
import {
    ContractSolData,
} from '@/types/contracts';
import { Account } from '@/types/rest.api/accounts';
import { NFT } from '@/types/rest.api/nft';
import { FullToken } from '@/types/rest.api/tokens';
import {
    Alert,
    Box,
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


export default function FairTradeDemoExercise () {

    const theme = useTheme();
    const treasureIdAccount = appConfig.demoValues.fairTradeValues.ftc_treasury_id;
    const tokenIdAccount = hederaItemsDemo.TOKEN_ID;
    const contractId = hederaItemsDemo.CONTRACT_ID;
    const topicId = hederaItemsDemo.TOPIC_ID;

    // wallets
    const [ownerAccount, setOwnerAccount] = useState<Account>();
    const [token, setToken] = useState<FullToken>();
    const [apiContract, setApiContract] = useState<ContractRestApiDemo>();
    const [solContract, setSolContract] = useState<ContractSolData>();
    const [loadingEvmContractData, setLoadingEvmContractData] = useState(false);

    const [errorMessage, setErrorMessage] = useState(``);
    const errorMessageText = `Something went wrong fetching data. Please try again later`;

    const getEvmContractData = async () => {
    };

    const getContractData = async () => {
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
        return `Donations so far to contract`;
    };

    const getRemainingBalance = (balance: number) => {
        return 0;
    };

    useEffect(() => {
        getAccountData();
        getContractData();
        getTokenData();
    }, []);

    useEffect(() => {
        console.log(`App config`);
        console.log(appConfig);
    }, [appConfig]);

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
                        apiContract && (
                            <>
                                <FieldLink label='Contract Id' idValue={apiContract?.contract_id} explorerCategory='contract' ></FieldLink>
                            </>
                        )
                    }
                </Box>
                
                <Box>
                    I need the basic Contract & Token data here
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
                    <Alert severity="info">
                        Render here all Fair Trade donators stored inside the contract
                    </Alert>
                    {
                        solContract?.fairTradeDonators && apiContract && (
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
                <Box sx={{marginTop: theme.spacing(5)}}>
                    <Divider></Divider>
                    <Typography>Arkhia 2023</Typography>
                </Box>
  
            </Stack>
        </Stack>
    );
}

