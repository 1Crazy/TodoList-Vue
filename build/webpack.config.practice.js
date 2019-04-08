const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 根据webpack配置项，合理合并webpack的config文件

const baseConfig = require('./webpack.config.base')

const defaultPluins = [
  new webpack.DefinePlugin({// 这里用到了webpack，所以文件上方有引入webpack，否则导致文件编译找不到webpack的情况
    'process.env': {
      NODE_ENV: '"development"'
    }
  }), // 可以在js内判断当前环境，方便开发环境中有一些调试提示，而正式环境不需要的东西
  // make sure to include the plugin for the magic
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const devServer = {
  port: 8000,
  host: 'localhost',
  overlay: {
    errors: true// 编译时如果有任何错误，让他显示到网页上
  },
  hot: true // 修改某组件代码，只会更新某组件，而不是刷新整个页面
  // open: true //编译完成后自动打开浏览器
}

let config

// 如果是开发环境
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map', // 开发环境中source文件显示源码
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     module: true, //开启cssModule模式
          //     localIdentName:  isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
          //   }
          // },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }// 配置vue该文件可以在new vue实例里配置template项
  },
  plugins: defaultPluins.concat([
    // 配置了上面hot在搭配下面使用
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin() webpack4已取消
  ])
})

module.exports = config
