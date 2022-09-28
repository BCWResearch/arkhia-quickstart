import './App.css';
import DemoIndex from './DemoIndex';
import Logo from '@/assets/generic/logo';
import Header from '@/components/generic/header';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React, { createContext } from "react";
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom';
import FairTradeDemoFinal from './demos/fairtrade/FairTradeDemoFinal';
import FairTradeDemoExercise from './demos/fairtrade/FairTradeDemoExercise';
import Watchtower from './demos/Watchtower';

const WIDTH: Record<string, { minWidth: number, maxWidth: number }> = {
    default: {
        minWidth: 350, maxWidth: 1200
    }
};

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


export default function App () {
    const { pathname } = useLocation();
    const CenteredContext = createContext<boolean>(false);

    return (
        <>
            <Header
                logo={<Logo width={`50em`}/>}
                sx={{ card: WIDTH[pathname] ?? WIDTH.default }}
            />
            <Stack
                justifyContent={`space-between`}
                sx={{
                    marginTop: `2em`,
                    height: `100vh`,
                }}
            >
                <CenteredContext.Provider value={true}>
                    <Container >
                        <Routes>
                            <Route index element={<DemoIndex />} />
                            <Route path='/fairtrade/final' element={<FairTradeDemoFinal />} />
                            <Route path='/fairtrade/exercise' element={<FairTradeDemoExercise />} />
                            <Route path='/watchtower/final' element={<Watchtower />} />
                        </Routes>
                    </Container>
                    { <Background /> }
                </CenteredContext.Provider>
            </Stack>
        
        </>
    );
}
