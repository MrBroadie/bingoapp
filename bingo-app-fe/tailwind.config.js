/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "ping-short": "ping 2s ease-in-out 1",
        "spin-short": "spin 1s ease-in-out 1",
      },
    },
    plugins: [],
  },
};
