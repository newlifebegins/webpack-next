const path = require('path');
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
        contentBase: path.join(__dirname, "dist"),   // 本地服务路径
		compress: true,  // 一切服务都启用gzip 压缩：
        port: 3000,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|otf|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:8].[ext]'
                    }
                }
            }
        ]
    }
};
module.exports = config;
