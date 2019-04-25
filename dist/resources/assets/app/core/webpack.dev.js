var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpack = require('./webpack.base');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var styleLoaders = require('./tools').styleLoaders;
module.exports = merge(baseWebpack, {
    // cheap-module-eval-source-map быстрее для разработки
    watch: true,
    module: {
        rules: styleLoaders({ sourceMap: false })
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new FriendlyErrorsPlugin()
    ]
});
