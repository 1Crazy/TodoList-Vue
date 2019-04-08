const path = require('path')

const createVueLoaderOpthions = require('./vue-loader.config') // vue-loader配置项

const isDev = process.env.NODE_ENV === 'development' // 判断是否为开发环境
// 不同平台上设置环境变量的方式不一样，装入cross-env这个包可以兼容mac和windwos系统上的命令，在package.json中使用
const config = {
  mode: process.env.NODE_ENV || 'production', // 有2个值development||production当值为development时不压缩bundle.js
  // optimization:{
  //   minimize: false//不压缩bundle.js，默认为true webpack3中可以使用这个
  // },
  target: 'web', // webpack编译目标
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOpthions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        exclude: /node_modules/ // 忽略文件
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
