module.exports = {
  important: true,
  purge: {
    mode: "layers",
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
      `./src/**/*.{html,js}`,
    ],
  },
  theme: {
    extend: {
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
    },
  },
  variants: {
    lineClamp: ["responsive", "hover"],
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
