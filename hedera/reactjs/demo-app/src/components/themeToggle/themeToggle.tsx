import atom from '@/atoms/atoms';
import DayNightToggle from "react-day-and-night-toggle";
import { useRecoilState } from 'recoil';

export default function ThemeToggle ({ size = 18 }: { size?: number }) {
    const [ darkMode, setDarkMode ] = useRecoilState(atom.darkMode);

    return (
        <DayNightToggle
            size={size}
            checked={darkMode}
            shadows={false}
            onChange={() => setDarkMode(!darkMode)}
        />
    );
}
