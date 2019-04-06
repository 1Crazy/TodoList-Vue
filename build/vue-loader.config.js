module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 写.vue文件时，如果在template有空格忘删除时，会导致渲染html页面渲染出来设为true则不会渲染
    extractCSS: !isDev,  // 将.vue内的css提取出来打包,为true则提取出来
    cssModules: { // FIXME: 此配置展示存在问题
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 将css根据文件名和文件路径生成独一无二的名字,保密性比较好
      camelCase: true // 将css类名转化为可以在js中用驼峰调用,z之后再scc中<style>标签加上module替代scoped之后，在js中可以使用$style.(class驼峰名调用)
    }
    // hotReload:false //配置成false以后，vue组件会取消热承载，默认根据环境变量生成
  }
}