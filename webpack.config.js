const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
    devtool: 'cheap-module-eval-source-map',    // original source (lines only)
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true,
        inline: true,    // 内联模式
        progress: true,
        color: true
    },
    // externals: {
    //     jquery: 'jQuery',     // 可以使用import $ from 'jquery';
    //     lodash: {
    //         root: '_'    // indicates global variable
    //     }
    // },
    performance: {
        hints: "error"  // 超过250kb的bundle会报错
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:9000'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        })
    ]
}