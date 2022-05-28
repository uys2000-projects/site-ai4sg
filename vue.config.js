const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  app: {
    config: {
      unwrapInjectedRef: true,
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
});
