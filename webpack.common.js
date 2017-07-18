const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


const extractScss = new ExtractTextPlugin('[name].css');

const sassImport = require('sass-module-importer')();

module.exports = {
    watch: false,
    cache: true,
    devtool: 'cheap-eval-source-map',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
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
        // new FriendlyErrorsWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'test title',
        //     filename: 'test.html'
        // }),
        // new LodashModuleReplacementPlugin({
        //     paths: true
        // }),
        // new ManifestPlugin({
        //     fileName: 'asset-manifest.json',
        //     publicPath: '/assets/haendler/',
        //     cache: {}
        // })
    ]
};
