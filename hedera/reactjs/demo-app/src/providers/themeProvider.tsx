import ArhiaLogoLight from '@/assets/generic/arkhia.logo.white.png';
import atom from '@/atoms/atoms';
import Overrides from '@/theme/overrides';
import Palette from '@/theme/palette';
import Typography from '@/theme/typography';
import {
    createTheme,
    responsiveFontSizes,
    StyledEngineProvider,
    ThemeProvider as MuiThemeProvider
} from '@mui/material/styles';
import { usePalette } from '@universemc/react-palette';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export default function ThemeProvider ({ children }: { children: JSX.Element }) {
    const darkMode = useRecoilValue(atom.darkMode);
    const { data } = usePalette(ArhiaLogoLight);

    const theme = useMemo(() => {
        const shape = { borderRadius: 12 };
        
        const basicTheme = createTheme({
            components: Overrides(darkMode),
            palette: Palette(data, darkMode),
            shape,
            typography: Typography()
        });
        
        return responsiveFontSizes(basicTheme);
    }, [data, darkMode]);

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>);
}































