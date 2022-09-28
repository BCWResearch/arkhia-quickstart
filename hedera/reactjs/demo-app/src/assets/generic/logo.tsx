import ArkhiaLogoDark from './arkhia.logo.black.png';
import ArkhiaLogoLight from './arkhia.logo.white.png';
import atom from '@/atoms/atoms';
import { CenteredContext } from '@/components/generic/header';
import { styled } from '@mui/material/styles';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import { useRecoilValue } from 'recoil';

const ImgLogo = styled(`img`)(({ theme }) => ({
    // flexGrow: 1,
    fontFamily: `Inter, -apple-system, Segoe UI, Helvetica, sans-serif`,
    objectFit: `contain`,
    paddingBottom: theme.spacing(4),
}));

export default function Logo ({ width, height }: { width?: number | string, height?: number | string }) {
    const {
        ARKHIA_LOGO_LIGHT,
        ARKHIA_LOGO_DARK
    } = import.meta.env;

    const darkMode = useRecoilValue(atom.darkMode);
    const isCentered = useContext(CenteredContext);

    const [ logo, setLogo ] = useState<string>(ArkhiaLogoLight);

    useEffect(() => {
        const logoFromURL = darkMode ? ARKHIA_LOGO_DARK : ARKHIA_LOGO_LIGHT;

        if (logoFromURL) {
            setLogo(logoFromURL.toString());
            return;
        }

        setLogo(darkMode ? ArkhiaLogoDark : ArkhiaLogoLight);
    }, [ darkMode ]);

    return (
        <ImgLogo
            src={logo}
            alt="Arkhia Team"
            width={width ?? 150}
            height={height ?? `auto`}
            style={{ margin: isCentered ? `0 auto` : undefined }}
        />);
}
