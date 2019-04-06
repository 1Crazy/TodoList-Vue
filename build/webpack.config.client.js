const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 根据webpack配置项，合理合并webpack的config文件
const ExtractPlugin = require('extract-text-webpack-plugin') // 帮助我们把非js东西打包成单独非js文件

const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development' // 判断是否为开发环境
// 不同平台上设置环境变量的方式不一样，装入cross-env这个包可以兼容mac和windwos系统上的命令，在package.json中使用

const defaultPluins = [
  new webpack.DefinePlugin({// 这里用到了webpack，所以文件上方有引入webpack，否则导致文件编译找不到webpack的情况
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),// 可以在js内判断当前环境，方便开发环境中有一些调试提示，而正式环境不需要的东西
  // make sure to include the plugin for the magic
  new VueLoaderPlugin(),
  new HTMLPlugin(),
]

const devServer = {
  port: 8080,
  host: 'localhost',
  overlay: {
    errors: true// 编译时如果有任何错误，让他显示到网页上
  },
  hot: true // 修改某组件代码，只会更新某组件，而不是刷新整个页面
  // open: true //编译完成后自动打开浏览器
}

let config

// 如果是开发环境
if (isDev) {
  config = merge(baseConfig,{
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
    plugins: defaultPluins.concat([
      // 配置了上面hot在搭配下面使用
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin() webpack4已取消
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vender: ['vue']
    },// 分离vue库为单独js文件
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module:{
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
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
        // cacheGroups: {                  // 这里开始设置缓存的 chunks
        //     commons: {
        //         chunks: 'all',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //         minSize: 0,             // 最小尺寸，默认0,
        //         // minChunks: 2,           // 最小 chunk ，默认1
        //         // maxInitialRequests: 5   // 最大初始化请求书，默认1
        //     },
        //     vendor: {
        //         test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
        //         chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //         name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
        //         priority: 10,           // 缓存组优先级
        //         enforce: true
        //     }
        // }
      },
      runtimeChunk: true
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[hash:8].css')
    ])
  })
}

module.exports = config
