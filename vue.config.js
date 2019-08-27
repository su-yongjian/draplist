// 在vue-cli3的项目中，
// npm run serve时会把process.env.NODE_ENV设置为‘development’；
// npm run build 时会把process.env.NODE_ENV设置为‘production’；
// 详细配置请参考： https://cli.vuejs.org/zh/config/#全局-cli-配置
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'  //public地址配置，如果需要
    ? '/'  
    : '/',
  devServer: {
    open: true
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 生产环境 sourceMap
  productionSourceMap: false,
  // 跨域设置 
  // 可取值参考： https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
  crossorigin: undefined,
  // 构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性, 默认false
  integrity: true,
}