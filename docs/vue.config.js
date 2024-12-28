module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  },
  publicPath: './'
};