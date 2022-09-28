import { PaletteColor } from '@mui/material/styles';

interface ColorSet {
    light: string;
    dark: string;
}

export interface ColorPalette {
    text: ColorSet;
    primary: string;
    secondary: string;
    backgroundPrimary?: string;
    backgroundSecondary?: string;
    gradientPrimary: string;
    gradientSecondary: string;
    error: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    warning: PaletteColor;
}
