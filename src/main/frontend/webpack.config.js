const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    source: path.join(__dirname, 'app'),
    output: path.join(__dirname, '../../../target/classes/static')
};

const prod = ({
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
});

const common = ({
    entry: [ 'babel-polyfill', PATHS.source ],
    devtool: 'source-map',
    output: {
        path: PATHS.output,
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx' ],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules'
        ],
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en|ru/),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.jsx$|\.js$|\.css$|\.html$/,
            minRatio: 0.9
        }),
// handles creating an index.html file and injecting assets. necessary because assets
// change name because the hash part changes. We want hash name changes to bust cache
// on client browsers.
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }]
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.gif$/,
            use: 'url-loader?mimetype=image/png'
        }, {
            test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
            use: 'url-loader?mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg|png)(\?v=[0-9].[0-9].[0-9])?$/,
            use: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.json?$/,
            use: 'json'
        } ]}
});

if (TARGET === 'build') {
    module.exports = merge(common, prod);
} else {
    module.exports = common;
}
