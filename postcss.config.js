const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer() //使用autoprefixer可以自动对各浏览器加前缀，不需要手动增加
  ]
}
