/// <reference types="vite/client" />
import type { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window{
        ethereum?:MetaMaskInpageProvider
    }
}

interface ImportMetaEnv {
    readonly VITE_APP_ENV: string;
    readonly VITE_APP_PORT: string;
    readonly VITE_ARKHIA_USE_MAINNET:string;
    readonly VITE_ARKHIA_MAINNET_BASE_URL: string;
    readonly VITE_ARKHIA_TESTNET_BASE_URL: string;

    readonly VITE_ARKHIA_REST_SUFFIX: string;
    readonly VITE_ARKHIA_JSON_RPC_SUFFIX: string;
    readonly VITE_ARKHIA_API_KEY: string;

    readonly VITE_ARKHIA_MAINNET_WATCHTOWER: string;
    readonly VITE_ARKHIA_TESTNET_WATCHTOWER: string;

    readonly VITE_HEDERA_FTC_TREASURY_ID: string;
    readonly VITE_HEDERA_FTC_TREASURY_PV_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
