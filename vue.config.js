module.exports = {
  publicPath: '/hexschool_vue2021_w8/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'Pinpin'
        return args
      })
  },
}