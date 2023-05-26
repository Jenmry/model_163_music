const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      //入口
      entry: "src/main.js"
    }
  }
})