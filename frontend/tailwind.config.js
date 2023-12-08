module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './node_modules/@uc-react-ui/multiselect/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        screens: {
            'sm': {'max': '576px'},
            // => @media (min-width: 576px) { ... }

            // 'md': '960px',
            // => @media (min-width: 960px) { ... }

            // 'lg': '1440px',
            // => @media (min-width: 1440px) { ... }
        },
        extend: {},
    },
    plugins: [],
}
