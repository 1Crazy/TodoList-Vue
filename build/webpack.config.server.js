const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 根据webpack配置项，合理合并webpack的config文件
const ExtractPlugin = require('extract-text-webpack-plugin') // 帮助我们把非js东西打包成单独非js文件

const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin') // 打包生成JSON文件,没有js文件

let config

// 如果是开发环境
config = merge(baseConfig, {
  target: 'node', // node环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map', // 代码调试
  output: {
    libraryTarget: 'commonjs2', // 指定输出类型
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  enternals: Object.keys(require('../package.json').dependencies), // 申明不打包文件
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
    new VueServerPlugin()
  ]
})

module.exports = config
