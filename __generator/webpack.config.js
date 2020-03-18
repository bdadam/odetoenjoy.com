const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassImport = require('sass-module-importer')();

const extractScssPlugin = new ExtractTextPlugin('[name].css');
const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: `${process.env.NODE_ENV || '"production"'}`,
    },
});
const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    beautify: false,
    mangle: {
        screw_ie8: true,
    },
    compress: {
        screw_ie8: true,
        warnings: false,
    },
});

const insertIf = (condition, ...elements) => (condition ? elements : []);
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    name: 'client',
    target: 'web',
    output: {
        path: path.resolve(process.cwd(), 'dist/static'),
        filename: '[name].js',
        publicPath: '/static/',
        // chunkFilename: '[name].bundle.js',
    },
    cache: true,
    devtool: 'source-map',
    entry: './generator/static/main.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'browser',
                    },
                },
            },
            {
                test: /\.scss$/,
                use: extractScssPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                importer: sassImport,
                            },
                        },
                    ],
                    fallback: ['style-loader'],
                }),
            },
        ],
    },
    plugins: [extractScssPlugin, definePlugin, ...insertIf(isProduction, uglifyPlugin)],
};
