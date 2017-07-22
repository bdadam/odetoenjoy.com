const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractScss = new ExtractTextPlugin('[name].css');
const sassImport = require('sass-module-importer')();

module.exports = {
    name: 'client',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    cache: true,
    devtool: 'source-map',
    entry: './src/client.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'browser'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractScss.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compressed',
                            importer: sassImport
                        }
                    }],
                    fallback: ['style-loader']
                })
            }
        ]
    },
    plugins: [
        extractScss,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `${process.env.NODE_ENV || '"production"'}`
            }
        }),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     debug: false
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     beautify: false,
        //     mangle: {
        //         screw_ie8: true,
        //     },
        //     compress: {
        //         screw_ie8: true,
        //         warnings: false
        //     }
        // })
    ]
};
