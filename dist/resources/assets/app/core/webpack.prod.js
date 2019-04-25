var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpack = require('./webpack.base');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var styleLoaders = require('./tools').styleLoaders;
module.exports = merge(baseWebpack, {
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: styleLoaders({ extract: true, sourceMap: true })
    },
    plugins: [
        new CleanWebpackPlugin(['build/*.*']),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
});
