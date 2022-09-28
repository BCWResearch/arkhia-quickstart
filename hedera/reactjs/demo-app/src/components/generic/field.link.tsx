
import appConfig from '@/config/appConfig';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import {
    Button,
    styled,
    TextField,
    useTheme
} from '@mui/material';
import React from 'react';

interface Props {
    idValue: string;
    label: string;
    explorerCategory?: string;
    width?: string;
}

const TextFieldId = styled(TextField)(({ theme }) => ({ paddingRight: theme.spacing(1,1) }));

export default function FieldLink (props: Props) {
    const theme = useTheme();
    const getExplorerLink = (elementId: string, category: string) => {
        const accountUrl = `${appConfig.explorer.explorerUrl()}/${category}/${elementId}`;
        return accountUrl;
    };
    return <>
        <TextFieldId
            sx={{
                width: props.width || `150px`, marginRight: props.explorerCategory ? `0px`: theme.spacing(2)
            }}
            label={props.label}
            value={props.idValue}
        ></TextFieldId>
        { props.explorerCategory && (
            <Button target="_blank" href={getExplorerLink(props.idValue, props.explorerCategory)}>
                <OutboundRoundedIcon></OutboundRoundedIcon>
            </Button>
        )}
       
    </>;
}

