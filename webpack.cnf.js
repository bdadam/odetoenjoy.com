const path = require('path');
const nodeExternals = require('webpack-node-externals');

const webpack = require('webpack');

// process.env.BABEL_ENV = 'node';

// const watch = false;
const watch = true;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractScss = new ExtractTextPlugin('[name].css');
const sassImport = require('sass-module-importer')();

const clientConfig = {
    name: 'client',
    cache: true,
    watch,
    target: 'web',
    // devtool: 'cheap-eval-source-map',
    devtool: 'source-map',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    stats: {
        modules: false,
        hash: false,
        version: false
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
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            mangle: {
                screw_ie8: true,
            },
            compress: {
                screw_ie8: true
            },
            warningsFilter: () => { }
        })
    ]
};

const serverConfig = {
    name: 'server-config',
    target: 'node',
    watch,
    devtool: 'source-map',
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'dist2'),
        filename: 'server.webpacked.js'
    },
    externals: [
        nodeExternals()
    ],
    stats: {
        modules: false,
        hash: false,
        version: false
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.s?css/],
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'node'
                    }
                }
            }
        ]
    }
};

module.exports = [
    clientConfig,
    serverConfig
];
