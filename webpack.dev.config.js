const path = require('path');
const webpack = require('webpack');
const webapckMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = webapckMerge(webpackBaseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 8088,
    open: true,
    overlay: true, //错误信息全屏写在浏览器上
    inline: true,
    proxy: {
			'/api': {
				target: 'http://47.100.138.80:3000',
				changeOrigin: true,
				pathRewrite: { '^/api': '' },
			}
		}
  }
})
