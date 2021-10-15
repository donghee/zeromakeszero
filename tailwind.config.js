module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ['./layouts/*.html', './layouts/**/*.html','./content/**/*.md', './content/**/**/*.md', './app/**/*.html'],
  },
  theme: {
    fontFamily: {
      spoqa: ["Spoqa Han Sans", 'sans-serif'],
      spoqajp: ["Spoqa Han Sans JP", 'sans-serif'],
      jejumyeongjo: ['Jeju Myeongjo', 'serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
