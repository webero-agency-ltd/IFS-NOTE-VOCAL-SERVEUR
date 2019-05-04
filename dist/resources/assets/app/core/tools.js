var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
exports.htmlPage = function (title, filename, chunks, template) { return new HtmlWebpackPlugin({
    title: title,
    hash: true,
    cache: true,
    inject: 'body',
    filename: './' + filename + '.html',
    template: template || path.resolve(__dirname, './page.ejs'),
    appMountId: 'app',
    chunks: chunks
}); };
exports.cssLoaders = function (options) {
    if (options === void 0) { options = {}; }
    var loaders = {};
    var prePprocessors = {
        css: {},
        postcss: {},
        less: { loader: 'less' },
        sass: { loader: 'sass', options: { indentedSyntax: true } },
        scss: { loader: 'sass' },
        stylus: { loader: 'stylus' },
        styl: { loader: 'stylus' }
    };
    for (var key in prePprocessors) {
        var loader = [{
                loader: 'css-loader',
                options: {
                    minimize: process.env.NODE_ENV === 'production'
                }
            }];
        if (prePprocessors[key].loader) {
            loader.push({
                loader: prePprocessors[key].loader + '-loader',
                options: Object.assign({}, prePprocessors[key].options, { sourceMap: options.sourceMap })
            });
        }
        if (options.extract) {
            loaders[key] = ExtractTextPlugin.extract({ use: loader, fallback: 'vue-style-loader' });
        }
        else {
            loaders[key] = ['vue-style-loader'].concat(loader);
        }
    }
    return loaders;
};
exports.styleLoaders = function (options) {
    var output = [];
    var loaders = exports.cssLoaders(options);
    for (var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }
    return output;
};
