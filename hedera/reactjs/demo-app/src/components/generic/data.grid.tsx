import {
    Alert,
    Grid,
    useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

interface Props {
    extraInfo?: string;
    rowsData: any;
    columnDef: any;
    minHeight?:string;
}
export default function ArkhiaDataGrid (props: Props) {
    const theme = useTheme();
    return (
        <Grid>
            {
                props.extraInfo && (
                    <Alert sx= {{ marginBottom: theme.spacing(2) }} severity="info">{props.extraInfo}</Alert>
                )
            }
            <DataGrid pagination columns={props.columnDef} rows={props.rowsData} sx={{ minHeight:props.minHeight || `40vh` }} />
        </Grid>
    );
}
