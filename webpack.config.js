const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development' //判断是否为开发环境
//不同平台上设置环境变量的方式不一样，装入cross-env这个包可以兼容mac和windwos系统上的命令，在package.json中使用
const config = {
  target: 'web',//webpack编译目标
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'dist')
  },
  plugins: [
    new webpack.DefinePlugin({//这里用到了webpack，所以文件上方有引入webpack，否则导致文件编译找不到webpack的情况
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),//可以在js内判断当前环境，方便开发环境中有一些调试提示，而正式环境不需要的东西
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HTMLPlugin(),
  ],
  mode: 'development',//开发环境同样不压缩bundle.js
  // optimization:{
  //   minimize: false//不压缩bundle.js，默认为true
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  }
}

//如果是开发环境
if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'//开发环境中source文件显示源码
  config.devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
      errors: true//编译时如果有任何错误，让他显示到网页上
    },
    hot: true //修改某组件代码，只会更新某组件，而不是刷新整个页面
    // open: true //编译完成后自动打开浏览器
  }
  //配置了上面hot在搭配下面使用
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
