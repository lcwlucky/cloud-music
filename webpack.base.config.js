const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    filename: 'js/[name].[hash:6].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '/dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // //添加处理scss loader
      // {
      // 	test: /\.(scss|sass)$/,
      // 	exclude: /node_modules/,
      // 	use: [
      // 		'style-loader',
      // 		{
      // 			loader: 'css-loader',
      // 			options: {
      // 				modules: true,  //开启模块化
      // 			}
      // 		},
      // 		{
      // 			loader: 'postcss-loader',
      // 			options: {
      // 				plugins: loader => [
      // 					require('autoprefixer')() //自动添加浏览器前缀
      // 				]
      // 			}
      // 		},
      // 		'sass-loader'
      // 	]
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|bmp|svg(\?v=\d+\.\d+\.\d+)?|woff|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          outputPath: './image',
          name: '[name]_[hash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      inject: 'body',
      favicon: path.resolve('public/favicon.ico'),
    })
  ]

}