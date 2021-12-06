const path = require('path');
const webapckMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = webapckMerge(webpackBaseConfig, {
  output: {
    filename: 'js/[name].[hash:6].js',
    publicPath: './',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ]
})
