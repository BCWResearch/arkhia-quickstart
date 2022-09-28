import { ColorPalette } from "../types/theme";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const colorPalette = atom<ColorPalette | undefined>({
    key: `colorPalette`,
    default: undefined,
    effects_UNSTABLE: [ persistAtom ],
});

export const darkMode = atom<boolean>({
    key: `darkMode`,
    default: true//Boolean(window.matchMedia(`(prefers-color-scheme: dark)`).matches),
    // effects_UNSTABLE: [ persistAtom ],
});

