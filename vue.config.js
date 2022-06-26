const { defineConfig } = require("@vue/cli-service");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = defineConfig({
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  configureWebpack: {
    plugins: [
      new PreloadWebpackPlugin({
        rel: "preload",
        as: "script",
      }),
    ],
  },
});
