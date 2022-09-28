import {
    Box,
    Divider,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import React, {
    useEffect,
    useState
} from 'react';

export default function Watchtower () {

    const theme = useTheme();

    useEffect(() => {
     
    }, []);

    return (
        <Stack spacing={4}>
            <Typography>Coming soon</Typography>
            <Box sx={{marginTop: theme.spacing(5)}}>
                <Divider></Divider>
                <Typography>Arkhia 2023</Typography>
            </Box>
        </Stack>
    );
}
