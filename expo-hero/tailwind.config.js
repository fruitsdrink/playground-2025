/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        rn: "1 1 2 0 rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: []
};
