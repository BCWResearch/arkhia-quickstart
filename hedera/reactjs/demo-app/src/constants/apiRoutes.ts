export const withoutCreds = { headers: { "Content-Type": `application/json` } };

export const withCreds = {
    headers: { "Content-Type": `application/json`, },
    withCredentials: true
};

export enum HEDERANET {
    MAINNET = `mainnet`,
    TESTNET = `testnet`
}
