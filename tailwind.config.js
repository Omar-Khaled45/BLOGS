/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        body: ["QuickSand"],
      },
      colors: {
        primary: "var(--primary-color)",
        secBackground: "var(--secBackground)",
        form: "var(--form-color)",
        mainText: "var(--main-text)",
      },
      boxShadow: {
        dark: "inset 0 0 3px 1px hsla(0, 0%, 100%, 0.075)",
      },
      backgroundImage: {
        homeLight: "url('/src/assets/wave-haikei.svg')",
        homeDark: "url('/src/assets/wave-haikei-dark.svg')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "750px",
          padding: "0 40px",
          "@screen md": {
            padding: "0 15px",
          },
          "@screen lg": {
            maxWidth: "970px",
          },
          "@screen xl": {
            maxWidth: "1170px",
          },
        },
      });
    },
  ],
};
