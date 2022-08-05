/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
        dmsans: ["DMSans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        heading: [
          "wfont_531ace_58938f917a1b4e66a2181c66dc63faa1",
          "wf_58938f917a1b4e66a2181c66d",
        ],
      },
      boxShadow: {
        "3xl": "3px -1px 27px 8px rgba(83, 224, 255, 0.4)",
      },
      margin: {
        396: "462px",
      },
      width: {
        550: "550px",
      },
      backgroundImage: {
        dotted: "url('/images/homepage/background.png')",
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacityValue("--tw-color-primary-50"),
          100: withOpacityValue("--tw-color-primary-100"),
          200: withOpacityValue("--tw-color-primary-200"),
          300: withOpacityValue("--tw-color-primary-300"),
          400: withOpacityValue("--tw-color-primary-400"),
          500: withOpacityValue("--tw-color-primary-500"),
          600: withOpacityValue("--tw-color-primary-600"),
          700: withOpacityValue("--tw-color-primary-700"),
          800: withOpacityValue("--tw-color-primary-800"),
          900: withOpacityValue("--tw-color-primary-900"),
        },
        dark: "#222222",
        primaryblue: "#4FC9E4",
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: 0.4,
            filter: "none",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-700px 0",
          },
          "100%": {
            backgroundPosition: "700px 0",
          },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        shimmer: "shimmer 1.3s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tw-elements/dist/plugin"),
    // require("daisyui"),
  ],
};
