const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');  // 每次清除dist下面的文件
const isHot = path.basename(require.main.filename) === 'webpack-dev-server.js';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: ['bootstrap', './src/app.js']
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: './js/[name].bundle.js'
  },
  devServer: {
    contentBase: './src',
    publicPath: '/',
    watchContentBase: true
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              minimize: false,
              importLoaders: 1
            }
          }
        ]
      },
      // Loader for the image files
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // use: 'url-loader?limit=10000'
        use: {
            loader: "url-loader?limit=10000",
            options: {
                name: 'fonts/[name].[hash:8].[ext]'
            }
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        // use: 'file-loader'
        use: {
            loader: "file-loader",
            options: {
                name: 'fonts/[name].[hash:8].[ext]'
            }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [{ loader: 'style-loader' }, { loader: 'font-awesome-loader' }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether'
    }),
    new HtmlWebpackPlugin({
      title: 'webpack4.x',
      chunks: ['app'],   //添加引入的js,也就是entry中的key
      filename: 'index.html',
      template: 'src/index.html',
      favicon:'./favicon.ico',
      minify: {
				removeComments: true,        // 去掉注释
        collapseWhitespace: true,     // 去掉空格
        removeEmptyAttributes: true,  // 去除空属性
				removeAttributeQuotes: true   // 压缩 去掉引号
      },
      hash: true   // 消除缓存
    }),
    new MiniCssExtractPlugin({
      filename: isHot ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};
