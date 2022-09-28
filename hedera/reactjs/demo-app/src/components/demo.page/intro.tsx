import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
    tokenName: string;
    tokenSymbol: string;
}
export default function Intro (props: Props) {
    const theme = useTheme();

    return (
        <Box sx={{ p: theme.spacing(2 ) }}>
            <Typography variant="body1">
                Welcome to our FairTrade Coffee launch demo page!
            </Typography>
            <Typography> &nbsp;  &nbsp;</Typography>
            <Typography>
                Our {props.tokenName} ({props.tokenSymbol}) is LIVE!
            </Typography>
            <Typography> &nbsp;  &nbsp;</Typography>
            <Typography variant="body1" >
                How can you start contributing ?
                Associate our {props.tokenSymbol} token to your Hedera account and transfer up to [x] amount of hbars
                to our donator contract. When we hit a donation target of 90% you will get {props.tokenSymbol} in return.
                Our contract information is below.
            </Typography>
      
            <Typography> &nbsp;  &nbsp;</Typography>
            <Typography>
                You can then have a 15% discount in fair trade coffee in our upcoming website
                fairtradeforlife.com!
            </Typography>
        </Box>
    );
}
