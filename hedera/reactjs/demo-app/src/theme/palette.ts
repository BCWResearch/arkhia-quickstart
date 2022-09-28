import {
    applyTheme,
    argbFromHex,
    themeFromSourceColor
} from '@material/material-color-utilities';
import { PaletteOptions } from '@mui/material/styles';
import { PaletteColors } from '@universemc/react-palette';

export default function Palette (palette: PaletteColors, darkMode: boolean): PaletteOptions {
    const lightVibrant = palette.lightVibrant ?? `#0E5FA1`;
    const darkMuted = palette.darkMuted ?? `#2196f3`;
    const primaryColor = darkMode ? lightVibrant : darkMuted;
    const secondaryColor = darkMode ? darkMuted : lightVibrant;

    const themeColors = themeFromSourceColor(argbFromHex(lightVibrant));

    // Print out the theme as JSON
    // console.log(JSON.stringify(themeColors, null, 2));

    // Check if the user has dark mode turned on
    // const systemDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches;

    // Apply the theme to the body by updating custom properties for material tokens
    applyTheme(themeColors, {
        target: document.body, dark: darkMode
    });

    return {
        mode: darkMode ? `dark` : `light`,
        background: { default: `transparent` },
        primary: { main: primaryColor },
        secondary: { main: secondaryColor }
    };
}



