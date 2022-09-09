/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Gilroy: ['Gilroy-Medium', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {'cyberpunk': {
        fontFamily: "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
        primary: "#ff7598",
        secondary: "#75d1f0",
        accent: "#5865f2",
        neutral: "#ffee00",  
        info: "#144cc7",  
        success: "#06c270",  
        warning: "#f08d32",
        error: "#ee4d27",
        "base-100": "#0d0d0d",
        "neutral-content": "#101820ff",
        "--rounded-box": "0",
        "--rounded-btn": "0",
        "--rounded-badge": "0",
        "--tab-radius": "0",
      }},
    ],
  },
  plugins: [require("daisyui")],

}
