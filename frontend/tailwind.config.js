/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: 'var(--black-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        secondaryHover: 'var(--secondary-color-hover)',
        danger: 'var(--danger-color)',
        dangerHover: 'var(--danger-color-hover)',
        attention: 'var(--attention-color)',
        white: 'var(--white-color)',
        whiteHover: 'var(--white-color-hover)',
        highlight: 'var(--highlight-color)',
        gray: 'var(--gray-color)',

        primaryDark: 'var(--primary-dark-color)',
        secondaryDark: 'var(--secondary-dark-color)',
        secondaryDarkHover: 'var(--secondary-dark-color-hover)',
        whiteDark: 'var(--white-dark-color)',
        whiteDarkHover: 'var(--white-dark-color-hover)',
        highlightDark: 'var(--highlight-dark-color)',
        dangerDark: 'var(--danger-dark-color)',
        errorDark: 'var(--error-dark-color)',
      },
    },
  },
  plugins: [],
};
