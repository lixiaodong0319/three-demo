const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("raw")
      .test(/\.(glsl|hdr)$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
});
