import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const email = atom<string | undefined>({
    key: `email`,
    default: undefined,
    // effects_UNSTABLE: [ persistAtom ],
});
