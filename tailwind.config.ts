import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'phone': '320px',
        'card-minimum': '560px',
        'tablet': '744px',
        'pc': '1280px',
        'ultra': '1900px'
      },
      colors: {
        'footer-grey': 'rgb(33,37,41)'
      }
    },
  },

  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class'
};
export default config;
