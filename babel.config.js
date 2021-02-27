// 项目发布阶段需要用到的 babel 插件
const prodPlugins = []
if(process.env.NODE_ENV == 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node'],
      "sourceMaps":true,
      "retainLines":true, 
    }
  },
  'plugins': [
    // 发布产品时的插件数组
    ...prodPlugins
  ]
}
