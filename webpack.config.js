const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');   // 生成HTML5插件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 抽离css插件
const config = {
    mode: 'development',
    entry: {
        index: './src/index/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].min.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),   // 本地服务路径
		compress: true,  // 一切服务都启用gzip 压缩：
        port: 8080,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: true,   // 启用css模块
								minimize: true   // 启用压缩
							}
						}
                    ],
					publicPath:'../'
                })
            },
            {
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test:/\.(sass|scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|otf|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: 'img/[hash:8].[name].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
    	new HtmlWebpackPlugin({
            title: 'webpack4.x',
            chunks: ['index'],   //添加引入的js,也就是entry中的key
            template: './src/index/index.html',
            filename: './index.html',
            favicon:'./favicon.ico',
            minify: {
				removeComments: true,        // 去掉注释
              	collapseWhitespace: true,     // 去掉空格
                removeEmptyAttributes: true,  // 去除空属性
				removeAttributeQuotes: true   // 压缩 去掉引号
            },
            hash: true   // 消除缓存
        }),
        new ExtractTextPlugin('./css/[name].min.css')
    ]
};
module.exports = config;
