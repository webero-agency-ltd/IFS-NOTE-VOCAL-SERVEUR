var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var path = require('path');
var webpack = require('webpack');
var _a = require('./tools'), cssLoaders = _a.cssLoaders, htmlPage = _a.htmlPage;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var resolve = function (dir) { return path.join(__dirname, '..', '', dir); };
module.exports = {
    entry: {
        index: resolve('./page'),
    },
    output: {
        path: path.join(__dirname, '../../../../../', 'dist/resources/assets'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].[name].js?[hash]',
        library: '[name]'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    loaders: __assign({}, cssLoaders(), { js: { loader: 'babel-loader' } }),
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, '..', 'page'), path.join(__dirname, '..', 'test')],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        //new CopyWebpackPlugin([{ from: path.join(__dirname, '..', 'static') }]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    performance: { hints: false },
};
