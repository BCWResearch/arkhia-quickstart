import ThemeToggle from "../themeToggle/themeToggle";
import {
    Box,
    Divider,
    Grid,
    Link,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
    Breakpoint,
    styled,
    SxProps,
    Theme,
    useTheme
} from "@mui/material/styles";
import React, { createContext } from "react";

const Background = styled(`div`)(({ theme }) => ({
    position: `fixed`,
    top: `-20%`,
    left: 0,
    pointerEvents: `none`,
    width: `100%`,
    height: `120%`,
    background: `radial-gradient(circle, rgba(45,132,235,0.2) 0%, rgba(255,255,255,0.1) 100%)`,
    zIndex: -2,
    ...(theme.palette.mode === `light` && { backgroundColor: `rgba(247,248,250, 1)`, }),
    ...(theme.palette.mode === `dark` && { backgroundColor: `rgba(0,0,0, 1)`, }),
}));

export const CenteredContext = createContext<boolean>(false);

interface Props {
    centered?: boolean;
    children?: React.ReactNode;
    maxWidth?: false | Breakpoint;
    logo?: string | JSX.Element;
    sx?: {
        pageWrap?: SxProps<Theme>;
        card?: SxProps<Theme>;
    }
}

export default function Header (props: Props) {
    const {
        centered,
        maxWidth,
        logo,
        sx,
    } = props;

    const theme = useTheme();
    const isCentered = centered ?? false;

    return (
        <>
            <Stack
                justifyContent={`space-between`}
                sx={{
                    marginTop: `2em`,
                    height: `5em`,
                    ...sx?.pageWrap
                }}
            >
                <CenteredContext.Provider value={isCentered}>
                    <Container maxWidth={maxWidth ?? false} sx={{ ...sx?.card }}>
                        <Card variant="outlined">
                            <Grid
                                container
                                sx={{ height:`5em` }}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    sx={{ p: `${theme.spacing(3, 3)} !important` }}
                                > <Link href="/">{ logo }</Link></Grid>
                                <Grid
                                    item
                                    sx={{
                                        marginTop: `-3em`, p: `${theme.spacing(3, 3)} !important`
                                    }}
                                >   <Typography variant="h6">Arkhia | Demos</Typography></Grid>
                            </Grid>
                        </Card>
                 
                        <Box display="flex"  justifyContent="space-between" sx={{  p: String(theme.spacing(1,1)) }}>
                            <Typography variant="body1" component="h5">
                            Developed on Hedera. Built with Arkhia.
                            </Typography>
                            <ThemeToggle />
                        </Box>
                    
                    </Container>
                    { <Background /> }
                   
                </CenteredContext.Provider>
            </Stack>
            <CenteredContext.Provider value={isCentered}>
                <Container maxWidth={maxWidth ?? false} sx={{ ...sx?.card }}>
                    <Divider sx={{ margin: String(theme.spacing(5,0)) }}></Divider>
                </Container>
            </CenteredContext.Provider>
           
        </>
    );
}







