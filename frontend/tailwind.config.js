/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        black: "#000",
        white: "#fff",
        transparent: "transparent",
        primary: "#390546",
        secondary: "#c73d6c",
        tertiary: "#de8dad",
        neutral: "#ffdce8",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      fontSize: {
        H900: ["2.07375rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        H800: ["1.72813rem", { lineHeight: "2rem", fontWeight: "700" }],
        H700: ["1.44rem", { lineHeight: "1.75rem", fontWeight: "700" }],
        H600: ["1.2rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        H500: ["1rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        H400: ["0.83313rem", { lineHeight: "1rem", fontWeight: "500" }],
        H300: ["0.69438rem", { lineHeight: "0.75rem", fontWeight: "700" }],
        H200: ["0.69438rem", { lineHeight: "0.75rem", fontWeight: "500" }],
        H100: ["0.57875rem", { lineHeight: "0.75rem", fontWeight: "500" }],
        P500: ["16px", { lineHeight: "24px", fontWeight: "semiBold" }],
        P400: ["16px", { lineHeight: "24px", fontWeight: "normal" }],
        P300: ["1.2rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        P250: ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        P200: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        P100: ["0.83313rem", { lineHeight: "1.5rem", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
