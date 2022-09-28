import { CenteredContext } from '@/components/generic/header';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

const CardImg = styled(`img`)(({ theme }) => ({
    // flexGrow: 1,
    fontFamily: `Inter, -apple-system, Segoe UI, Helvetica, sans-serif`,
    objectFit: `contain`,
    paddingBottom: theme.spacing(4),
}));

interface Props {
    width: number | string;
    height: number | string;
    image: any;
}

export default function CardImage (props: Props) {
 
    const isCentered = useContext(CenteredContext);

    return (
        <CardImg
            src={props.image}
            alt="Arkhia Use case"
            width={props.width ?? 150}
            height={props.height ?? `auto`}
            style={{ margin: isCentered ? `0 auto` : undefined }}
        />);
}
