
import Divider, { DividerProps } from '@mui/material/Divider';
import { styled } from "@mui/material/styles";
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const HoverDivider = styled(Divider)(() => ({
    '& .MuiDivider-wrapper': { paddingRight: `calc(8px * 2.4)` },
    '& .MuiDivider-wrapper:hover:before': { opacity: 0, },
    '& .MuiDivider-wrapper:hover:after': { opacity: 1, },
    '& .MuiDivider-wrapper:before': {
        position: `absolute`,
        content: `"||"`,
        opacity: 1,
    },
    '& .MuiDivider-wrapper:after': {
        position: `absolute`,
        content: `"or"`,
        opacity: 0,
    },
    '& .MuiDivider-wrapper:before, & .MuiDivider-wrapper:after': { transition: `opacity 0.5s linear` },
}));

interface Props extends DividerProps {
    isClickable?: boolean;
    isPersistent?: boolean;
}

export default function OrDivider (props: Props) {
    const { isClickable, isPersistent } = props;
    const isSymbolState = atom<Boolean>({
        key: `isSymbol`,
        default: true,
        effects_UNSTABLE: isPersistent ? [ persistAtom ] : undefined,
    });

    const [ isSymbol, setIsSymbol ] = useRecoilState(isSymbolState);

    return (
        isClickable ?
            <Divider
                {...props}
                onClick={() => setIsSymbol(!isSymbol) }
            >
                { isSymbol ? `||` : `or`}
            </Divider> :
            <HoverDivider {...props}>&#8288;</HoverDivider>
    );
}
