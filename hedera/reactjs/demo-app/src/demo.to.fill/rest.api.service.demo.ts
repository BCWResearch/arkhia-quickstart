import appConfig from "@/config/appConfig";
import axios from "axios";

const body = { headers: { "x-api-key": appConfig.arkhiaApi.arkhiaApiKey } };
const restApiUrl = appConfig.arkhiaApi.getRestApiUrl();

const getContractById = async (contract_id: string) => {
    const url = `${restApiUrl}/contracts/${contract_id}`;
    const response = await axios.get(url, body);
    return response;
}

const getAccountById = async (account_id: string) => {
    const url = `${restApiUrl}/accounts/${account_id}`;
    const response = await axios.get(url, body);
    return response;
}



export const RestApiServiceDemo = {
    getContractById,
    getAccountById
};
