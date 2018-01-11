const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        app: path.resolve(__dirname + '/src/index.js'),
        vendor: ['react', 'react-redux', 'react-dom', 'react-router', 'redux', 'classnames']
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'bundle.[hash:8].js',
        chunkFilename: '[name].[chunkHash:8].js'
    },
    devtool: 'source-map',    // original source
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'dist')
                ],
                use: [{
                        loader: 'babel-loader'
                    },{
                        loader: 'eslint-loader'
                }]
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            if (env === 'development') {
                                return '[path][name].[ext]'
                            }
                            return '[hash].[ext]'
                        }
                    }
                  }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less']    // Automatically resolve certain extensions
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true,
        inline: true,    // 内联模式
        progress: true,
    },
    // externals: {
    //     jquery: 'jQuery',     // 可以使用import $ from 'jquery';
    //     lodash: {
    //         root: '_'    // indicates global variable
    //     }
    // },
    plugins: [
        extractLess,
        new OpenBrowserPlugin({
            url: 'http://localhost:9000'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ // 解决生成的带hash文件的调用问题
            template: 'index.html',
            title: 'yiyi',
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: false // 删除空白符与换行符
            },
            hashData: new Date().getTime(),
            hash : false, // 内容改变时，才会进行重新hash赋值
            inject : true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}