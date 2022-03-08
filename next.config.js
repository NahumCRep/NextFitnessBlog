/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()
module.exports = removeImports({
    images:{
        domains:[
          "lh3.googleusercontent.com",
          "images.unsplash.com"
        ]
      }
})
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
