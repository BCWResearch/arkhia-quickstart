import StreamingTopics from '@/components/watchtower/streaming.topics';
import appConfig from '@/config/appConfig';
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
    const topicId = appConfig.demoValues.fairTradeValues.ftc_topic_id;

    useEffect(() => {
     
    }, []);

    return (
        <Stack spacing={4}>
            <StreamingTopics topicId={topicId}></StreamingTopics>
            <Box sx={{marginTop: theme.spacing(5)}}>
                <Divider></Divider>
                <Typography>Arkhia 2023</Typography>
            </Box>
        </Stack>
    );
}
