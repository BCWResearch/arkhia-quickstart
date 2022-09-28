import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

export default function Button (props: LoadingButtonProps) {
    const {
        size,
        sx,
        variant,
        ...other
    } = props;

    return (
        <LoadingButton
            size={size ?? `large`}
            variant={variant ?? `contained`}
            sx={{
                borderRadius: 36,
                boxShadow: `unset`,
                fontWeight: 600,
                textTransform: `capitalize`,
                lineHeight: 0,
                ...sx,
            }}
            {...other}
        >
            {props.children}
        </LoadingButton>
    );
}
