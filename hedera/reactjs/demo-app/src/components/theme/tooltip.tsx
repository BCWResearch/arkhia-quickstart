import { desktopBreakpoint } from '@/providers/themeProvider';
import {
    styled,
    Tooltip,
    tooltipClasses,
    TooltipProps
} from '@mui/material';
import React from 'react';

interface ArkTooltipProps extends TooltipProps {
    width?: string;
    backgroundColor?: string;
}

export const ArkTooltip = styled(
    ({ className, ...props }: ArkTooltipProps) => <Tooltip {...props} classes={{ popper: className }} />,
    { shouldForwardProp: (prop) => prop !== `backgroundColor` }
)(({ theme, width, backgroundColor }) => ({
    [`& .${tooltipClasses.arrow}`]: { color: backgroundColor ?? theme.palette.grey[700] },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: backgroundColor ?? theme.palette.grey[700],
        width,
        maxWidth: width ?? `420px`,
        [theme.breakpoints.down(desktopBreakpoint)]: { maxWidth: `calc(100vw - ${theme.spacing(4)})` },
    },
}));
