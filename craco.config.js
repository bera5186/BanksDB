module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss')('./tailwind.config'),
          require('autoprefixer'),
        ],
      },
    },
  }