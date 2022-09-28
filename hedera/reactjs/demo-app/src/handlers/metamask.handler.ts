import { WalletInfo } from "@/types/demo";
import { ethers } from "ethers";

const metaMaskIsAvailable = () => {
    return window.ethereum !== undefined;
};

const metaMaskIsConnected =  async () => {
    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await etherProvider.send(`eth_requestAccounts`, []);
    return accounts[0] || false;
};

const connectToWallet = async () => {
    if (!metaMaskIsAvailable() || !metaMaskIsConnected()) return;
    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await etherProvider.send(`eth_requestAccounts`, []);
    return accounts;
};

const getWalletInfo = async () : Promise<WalletInfo> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send(`eth_requestAccounts`, []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(balance);
    return {
        accountAddress: accounts[0], balance: balanceInEther
    };
};

export const MetamaskService = {
    metaMaskIsAvailable,
    metaMaskIsConnected,
    connectToWallet,
    getWalletInfo,
};
