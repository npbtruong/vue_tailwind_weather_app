/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#2C5F2D",
        "weather-secondary": "#97BC62",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },
    container: {
      padding: "2rem",
      center: "true"
    },
    screens:{
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

