import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#F9F9F9",
          white: "#FEFEFE",
          black: "#1E1F20",
        },
        amber: {
          DEFAULT: "#FBB931",
          50: "#FFFBEc",
          100: "#FEF2C9",
          600: "#F5A500",
          700: "#E79B00",
        },
        orange: "#FF9424",
        neutral: {
          100: "#EDEEF1",
          200: "#D8DBDF",
          600: "#5B616E",
          800: "#40444C",
          900: "#383A42",
          950: "#25272C",
        },
        error: "#D03131",
        success: "#19B64E",
        disabled: "#8E8F8F",
        hyperlink: "#1282C0",
      },
      fontFamily: {
        heading: ['"REM"', "sans-serif"],
        body: ["var(--font-noto-sans-jp)", '"Noto Sans JP"', "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        "md-sm": "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      zIndex: {
        background: "0",
        base: "10",
        panel: "20",
        elevated: "30",
        modal: "40",
        chrome: "50",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
