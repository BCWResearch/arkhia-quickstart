import FieldLink from '../generic/field.link';
import { ContractHandler } from '@/handlers/contract.handler';
import { MetamaskService } from '@/handlers/metamask.handler';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {
    Box,
    Button,
    Divider,
    Link,
    Stack,
    styled,
    TextField
} from '@mui/material';
import { useEffect, useState } from 'react';

const TextFieldDemo = styled(TextField)(({ theme }) => ({
    paddingRight: theme.spacing(2), width: `200px`
}));

const WalletButton = styled(Button)(({ theme }) => ({
    backgroundColor: `#FF6801`,
    color: `white`,
    width: `100%`,
    border: `solid 1px white`,
    padding: theme.spacing(2, 5),
    marginTop: theme.spacing(2),
    height: `10px`
}));

const DoubleArrowDonate = styled(DoubleArrowIcon)(({ theme }) => ({
    margin: theme.spacing(2, 1), marginRight: theme.spacing(2)
}));

interface Props {
    tokenName: string;
}

export default function WalletIntegration (props: Props) {
    const [activeConnectedWallet, setActiveConnectedWallet] = useState(``);

    // Metamask
    const [metamaskAvailable, setMetamaskAvailable] = useState(false);
    const [metamaskConnected, setMetamaskConnected] = useState(false);
    const [metamaskBalance, setMetamaskBalance] = useState(``);
    const [flexibleMetamaskBalance, setFlexibleMetamaskBalance] = useState(``);
    const [metamaskAddress, setMetamaskAddress] = useState(``);

    const [inTransaction, setInTransaction] = useState(false);

    // Donation
    const [donationExchangeValue, setDonationExchangeValue] = useState(0);
    const [donationExchangeName, setDonationExchangeName] = useState(``);
    const [donationExchangeMemo, setDonationExchangeMemo] = useState(``);
    const [displayDonationInterface, setDisplayDonationInterface] = useState(false);

    const initMetamaskAccountFetch = async () => {
        const walletInfo = await MetamaskService.getWalletInfo();
        setMetamaskBalance(walletInfo.balance);
        setFlexibleMetamaskBalance(walletInfo.balance);
        setDonationExchangeValue(0);
        setMetamaskAddress(walletInfo.accountAddress);
    };

    const setDonationExchangeNameValue = (e: any) => {
        setDonationExchangeName(String(e.target.value));
    };

    const setDonationExchangeMemoValue = (e: any) => {
        setDonationExchangeMemo(String(e.target.value));
    };

    const setTokenValue = (e: any) => {
        if (Number(e.target.value) < 0) return;

        const newBalance = Number(metamaskBalance) - Number(e.target.value);

        if (newBalance < 0) return;

        setFlexibleMetamaskBalance(String(newBalance));
        setDonationExchangeValue(e.target.value);
    };

    const confirmDonateTransaction = async () => {
        setInTransaction(true);
        const result = await ContractHandler.donateHbar(donationExchangeValue, donationExchangeName, donationExchangeMemo);
        console.log(result);
        return;
    };

    const transactionIsReady = () : boolean => {
        return !(donationExchangeName !== `` && Number(donationExchangeValue) > 0);
    };

    const getDisplayDonationInterface = () => {
        return displayDonationInterface && (
            <Stack spacing={2}>
               
                <Box display={`flex`} justifyContent={`center`}>
                    <FieldLink width='35%' label='Your Address' idValue={metamaskAddress} explorerCategory='account' ></FieldLink>
                    <TextFieldDemo sx= {{ width: `20%` }} label="Your Hbars" value={flexibleMetamaskBalance}> </TextFieldDemo>
                    <DoubleArrowDonate></DoubleArrowDonate>
                    <TextFieldDemo sx= {{ width: `20%` }} disabled={inTransaction} label={props.tokenName} value={donationExchangeValue} onChange={setTokenValue}></TextFieldDemo>
                    <TextFieldDemo sx= {{ width: `20%` }} disabled={inTransaction} label="Name" value={donationExchangeName} onChange={setDonationExchangeNameValue}></TextFieldDemo>
                    <TextFieldDemo sx= {{ width: `40%` }} disabled={inTransaction} label="Optional Memo" value={donationExchangeMemo} onChange={setDonationExchangeMemoValue}></TextFieldDemo>
                </Box>
                <Divider>
                    <Box display={`flex`} justifyContent={`center`}>
                        
                    </Box>
                </Divider>
                <Box display={`flex`} justifyContent={`center`}>
                    <WalletButton
                        sx={{ width: `25%` }}
                        disabled={transactionIsReady()}
                        onClick={confirmDonateTransaction}
                    >Donate</WalletButton>
                </Box>
            </Stack>);
    };

    const setDisplayDonationInterfaceMethod= () => {
        setDisplayDonationInterface(!displayDonationInterface);
    };

    const isMetamaskAvailable = () => {
        setMetamaskAvailable(MetamaskService.metaMaskIsAvailable());
    };

    const isMetamaskConnected = async () => {
        const isConnected = await MetamaskService.metaMaskIsConnected();

        if (isConnected) {
            initMetamaskAccountFetch();
            setActiveConnectedWallet(`Metamask`);
        }

        setMetamaskConnected(isConnected);
    };

    const metamaskDisconnectedEvent = () => {
        setMetamaskConnected(false);
        setDisplayDonationInterface(false);
        setDonationExchangeValue(0);
        setActiveConnectedWallet(``);
    };

    useEffect(() => {
        isMetamaskAvailable();
        isMetamaskConnected();
    }, []);

    useEffect(() => {
        const accountWasChanged = (accounts: any) => {
            if (accounts.length === 0) return metamaskDisconnectedEvent();
            isMetamaskConnected();
        };

        if (window.ethereum === undefined) return;
        window.ethereum.on(`accountsChanged`, accountWasChanged);
    }, []);

    return (
        <>
            {
                metamaskAvailable ?
                    <>
                        {
                            !metamaskConnected ?
                                <Button onClick={initMetamaskAccountFetch}>Connect to Metamask
                                </Button> :
                                <>
                                    <Button onClick={setDisplayDonationInterfaceMethod}>Buy Token with {activeConnectedWallet}</Button>
                                    {getDisplayDonationInterface()}
                                </>
                        }
                    </>
                    :
                    <>
                        <Button> <Link target="_blank" href="https://metamask.io">No Metamask available</Link></Button>
                    </>
            }
        </>
    );
}
