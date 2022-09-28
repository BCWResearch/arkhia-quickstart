import { MetamaskService } from "./../handlers/metamask.handler";
import appConfig from "@/config/appConfig";
import { ContractSolInfo } from "@/types/contracts";
import { ethers } from "ethers";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import hederaItems, { hederaItemsDemo } from "@/config/hederaItems";

// Main init vars
const providerUrl = appConfig.arkhiaApi.getJsonRpcUrl();  // Arkia
const web3 = new Web3(providerUrl);
const abi = ``;
// Main contract vars
const contractjJson = JSON.parse(abi);
const contractId = hederaItemsDemo.CONTRACT_SOLIDITY_ID;

// Web3 for metadata
const fairTradeContract = new web3.eth.Contract(contractjJson, contractId);

let fairTradeCoffeeDataCache: ContractSolInfo = {
    creatorName: ``,
    tokenAddress: ``,
    tokenName: ``,
    tokenSupply: ``,
    tokenSymbol: ``
};

const getContractBalance = async () => {
    const balance = await web3.eth.getBalance(contractId);
    const balanceHbars = Math.round(Number(Web3.utils.fromWei(balance.toString())) * 100) /100;
    return balanceHbars;
};

const getContractMetada = async () => {
    return ``;
}

export const ContractHandlerDemo= {
    getContractBalance,
};
