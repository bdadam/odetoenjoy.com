const path = require('path');
const nodeExternals = require('webpack-node-externals');

const webpack = require('webpack');

// process.env.BABEL_ENV = 'node';

const clientConfig = {};
const serverConfig = {
    name: 'server-config',
    target: 'node',
    // watch: true,
    watch: false,
    devtool: 'source-map',
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'dist2'),
        filename: 'server.webpacked.js'
    },
    externals: [
        nodeExternals()
    ],
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
    // clientConfig,
    serverConfig
];
