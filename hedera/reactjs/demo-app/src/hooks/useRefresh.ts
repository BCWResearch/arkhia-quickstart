import { RefreshContext } from "../providers/refreshContext";
import { useContext } from 'react';

export const useRefresh = () => {
    const { fast, slow } = useContext(RefreshContext);

    return {
        fastRefresh: fast,
        slowRefresh: slow,
    };
};
