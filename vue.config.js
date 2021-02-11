module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/style.scss";`
      }
    }
  }
};
