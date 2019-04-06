module.exports = (isDev) => {
  return {
    preserveWhitepace: true, //写.vue文件时，如果在template有空格忘删除时，会导致渲染html页面渲染出来设为true则不会渲染
    extractCSS: !isDev, //将.vue内的css提取出来打包,为true则提取出来
    cssModules: {},
    // hotReload:false //配置成false以后，vue组件会取消热承载，默认根据环境变量生成
  }
}