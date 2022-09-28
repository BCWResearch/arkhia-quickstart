import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
    Breakpoint,
    styled,
    SxProps,
    Theme
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
    maxWidth?: false | Breakpoint;
    sx?: {
        pageWrap?: SxProps<Theme>;
        card?: SxProps<Theme>;
    }
}

export default function Layout (props:Props) {

    return (
        <Stack
            justifyContent={`space-between`}
            sx={{
                marginTop: `2em`,
                height: `100vh`,
            }}
        >
            <CenteredContext.Provider value={true}>
                <Container maxWidth={props.maxWidth}>
          
                </Container>
                { <Background /> }
            </CenteredContext.Provider>
        </Stack>);
}















