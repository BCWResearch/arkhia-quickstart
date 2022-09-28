/* eslint-disable object-curly-newline */
import { ColorPalette } from "@/types/theme";
import { Components } from "@mui/material";

export default function Overrides (darkMode: boolean, colorPalette?: ColorPalette): Components {
    
    return {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: `blur(5px) opacity(1)`,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    transition: `font-size 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    fontFeatureSettings: `"zero", "cv09"`,
                },
            },
        },
    };
}
