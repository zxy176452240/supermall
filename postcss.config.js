module.exports = {
  plugins: {
    autoprefixer: {},

    // 用于统一将px修改为vw的插件相关配置
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是设计稿的宽度（）
      viewportHeight: 667, // 视窗的高度，对应的是设计稿的高度（也可以不配置）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（因为很多时候无法整除）
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于`1px`不进行转换（视窗单位）
      mediaQuery: false // 允许在媒体查询中转换`px`
    }
  }
}
