import "inter-ui/inter.css";

export default function Typography () {
    const localeFontFamily = `Inter`;
    const localeWeightLight = 300;
    const localeWeightMedium = 400;
    const localeWeightRegular = 500;
    const localeWeightBold = 700;
    
    const fonts = [
        localeFontFamily,
        `system-ui`,
        `sans-serif`,
    ];
    
    const fontFamily  = fonts.map( font => `"${font}"`).join(`,`);
    
    return {
        fontFamily,
        fontWeightBold: localeWeightRegular,
        fontWeightLight: localeWeightLight,
        fontWeightMedium: localeWeightMedium,
        fontWeightRegular: localeWeightRegular,
    };
}
