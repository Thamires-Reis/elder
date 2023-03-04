/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{jsx,js,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
}
