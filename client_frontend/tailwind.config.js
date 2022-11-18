/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontSize: {
            xs: ['12px', '18px'],
            sm: ['14px', '20px'],
            base: ['16px', '24px'],
            lg: ['20px', '28px'],
            xl: ['24px', '32px']
        },
        extend: {
            colors: {
                'sidebar-blue':'#404555',
                'golden':'#F1C12B',
                'neutral-black':'#121317',
                'neutral-grey':'#404555',
                'royal-blue':'#2558E5',
                'neutral-divider':'#DCDEE5',
                'error': '#D92D20',
                'charcoal': '#606880'

            },
            fontFamily: {
                'poppins': ['Poppins'],
            }
        },
    },
    plugins: [],
}
