const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    name: 'server-config',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.webpacked.js',
        // devtoolModuleFilenameTemplate: '[absolute-resource-path]'
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    cache: true,
    devtool: 'source-map',
    entry: path.resolve('./src', 'server.js'),
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
