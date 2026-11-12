const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.html',
        './frontend/**/*.html',
        './admin/**/*.html',
        './assets/js/**/*.js',
        './src/**/*.{html,js}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
            },
            colors: {
                brand: {
                    red: '#ef4444',
                },
                primary: {
                    DEFAULT: '#8B0000', // Dark Crimson
                    50: '#fff1f1',
                    100: '#ffe0e0',
                    200: '#ffc7c7',
                    300: '#ffa0a0',
                    400: '#ff6969',
                    500: '#f83b3b',
                    600: '#dc1e1e',
                    700: '#b91212',
                    800: '#8B0000',
                    900: '#6e0404',
                    950: '#3d0000',
                },
            },
        },
    },
    plugins: [
        // RTL & BiDi configuration
        // Tailwind CSS v3.3+ also provides built-in rtl:/ltr: variants and logical
        // utilities (ms-*, me-*, ps-*, pe-*, start-*, end-*, text-start, text-end).
        plugin(({ addBase, addUtilities }) => {
            addBase({
                'html[dir="rtl"]': {
                    direction: 'rtl',
                },
                '[dir="ltr"]': {
                    direction: 'ltr',
                },
            });

            addUtilities({
                '.dir-rtl': {
                    direction: 'rtl',
                },
                '.dir-ltr': {
                    direction: 'ltr',
                },
                '.rtl-flip': {
                    '[dir="rtl"] &': {
                        transform: 'scaleX(-1)',
                    },
                },
            });
        }),
    ],
};
