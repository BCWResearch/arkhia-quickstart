/* eslint-disable putout/putout */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import MuiTextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(MuiTextField, { shouldForwardProp: (prop) => prop !== `isAccountButton` })<Props>(({ theme, isAccountButton }) => ({
    '& .MuiOutlinedInput-root': { borderRadius: 36 },
    '& .MuiOutlinedInput-input': { paddingLeft: theme.spacing(3) },
    '& .MuiInputLabel-root': { marginLeft: theme.spacing(1) },
    '& .MuiOutlinedInput-notchedOutline': { paddingLeft: theme.spacing(2) },
    "& .Mui-disabled": {
        color: isAccountButton ? theme.palette.text.primary : undefined,
        '-webkit-text-fill-color': isAccountButton ? `${theme.palette.text.primary} !important` : undefined,
    }
}));

interface Props extends OutlinedTextFieldProps {
    isAccountButton?: boolean;
    onKeyDownEnter?: () => void;
}

export default function TextField (props: Props) {
    const {
        helperText,
        isAccountButton,
        onKeyDownEnter,
        type,
        ...other
    } = props;
    const navigate = useNavigate();

    const [ isVisible, setIsVisible ] = useState(false);

    const handleClickVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleMouseDownVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        type === `password` ?
            <StyledTextField
                {...other}
                helperText={helperText}
                type={isVisible ? `text` : `password`}
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label={`toggle password visibility ${isVisible ? `off` : `on`}`}
                            edge="start"
                            onClick={handleClickVisibility}
                            onMouseDown={handleMouseDownVisibility}
                        >
                            { isVisible ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                    </InputAdornment>
                }}
                onKeyDown={(e) => {
                    if (e.key === `Enter`) { onKeyDownEnter; };
                }}
            /> :
            (
                isAccountButton ?
                    <StyledTextField
                        {...other}
                        isAccountButton
                        type={type}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label={`email account`}
                                        edge="end"
                                        onClick={() => navigate(`/signin`)}
                                    >
                                        <Tooltip
                                            placement="right-end"
                                            title="change email address"
                                        >
                                            <ArrowForwardIcon />
                                        </Tooltip>
                                    </IconButton>
                                </InputAdornment>
                        }}
                        variant="outlined"
                        inputProps={{ color: `white` }}
                    /> :
                    <StyledTextField
                        {...other}
                        type={type}
                        variant="outlined"
                        helperText={helperText}
                        onKeyDown={(e) => {
                            if (e.key === `Enter`) { onKeyDownEnter; };
                        }}
                    />
            )
    );
}
