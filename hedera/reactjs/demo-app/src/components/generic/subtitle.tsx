import {
    Divider,
    Typography,
} from '@mui/material';
import React from 'react';

interface Props {
    title: string;
}

export default function Subtitle (props: Props) {

    return <>
        <Typography variant="h6">
             {props.title}
        </Typography>
        <Divider></Divider>
    </>;
}
