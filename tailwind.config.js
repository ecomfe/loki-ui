/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx,md,mdx,css,js}'],
    important: false,
    theme: {
        extend: {
            borderColor: ['hover', 'focus-within'],
        },
    },
};
