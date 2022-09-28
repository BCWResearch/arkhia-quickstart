import { MetamaskService } from "./metamask.handler";
import appConfig from "@/config/appConfig";
import { ContractSolDataDonators, ContractSolInfo } from "@/types/contracts";
import { ethers } from "ethers";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { abi } from "@/abis/ftc.contract";

// Main init vars
const providerUrl = appConfig.arkhiaApi.getJsonRpcUrl();
const web3 = new Web3(providerUrl);

// Main contract vars
const contractJson = await JSON.parse(abi);
const contractId = appConfig.demoValues.fairTradeValues.ftc_contract_solidity_id;

// Web3 for metadata
const fairTradeContract =  new web3.eth.Contract(contractJson, contractId);

let fairTradeCoffeeDataCache: ContractSolInfo = {
    creatorName: ``,
    tokenAddress: ``,
    tokenName: ``,
    tokenSupply: ``,
    tokenSymbol: ``
};

const getNetworkId = async () => {
    const networkId = await web3.eth.net.getId();
    return networkId;
};

const getContractBalance = async () => {
    const balance = await web3.eth.getBalance(contractId);
    const balanceHbars = Math.round(Number(Web3.utils.fromWei(balance.toString())) * 100) /100;
    return balanceHbars;
};

const getContractMetadata = async () : Promise<ContractSolInfo> => {
    fairTradeCoffeeDataCache = await fairTradeContract.methods.getContractMetadata().call();
    return fairTradeCoffeeDataCache;
};

const getFairTradeBuyers = async () : Promise<Array<ContractSolDataDonators>> => {
    const getFairTradeBuyers = await fairTradeContract.methods.getFairTradeBuyers().call();
    return getFairTradeBuyers;
};

const getFairTradeBuyerNumbers = async () : Promise<number> => {
    const getFairTradeBuyerNumbers = await fairTradeContract.methods.getFairTradeBuyerNumbers().call();
    return getFairTradeBuyerNumbers;
};

const getContract = (): Contract  => {
    return fairTradeContract;
};


const donateHbar = async (_donationValue: number, _name: string, _message: string) => {

    const walletAddress = (await MetamaskService.getWalletInfo()).accountAddress;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(walletAddress);

    // load contract into ethers with signature
    const fairTradeContractEthers = new ethers.Contract(contractId, abi, signer);
    const valueToDonate = ethers.utils.parseEther(String(_donationValue));

    const result = fairTradeContractEthers.makeDonationHbars(_name, _message, valueToDonate, { value: valueToDonate });

    fairTradeContractEthers.on("FairTradeEvent", (from: any, to: any, value: any, event: any)=>{

        let transferEvent ={
            from: from,
            to: to,
            value: value,
            eventData: event,
        }
        console.log(JSON.stringify(transferEvent, null, 4))
    });

    return fairTradeContractEthers;
};



export const ContractHandler = {
    getNetworkId,
    getContract,
    getContractBalance,
    getContractMetadata,
    getFairTradeBuyers,
    getFairTradeBuyerNumbers,
    donateHbar
};

