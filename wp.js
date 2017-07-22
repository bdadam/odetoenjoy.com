const webpack = require('webpack');
// const cfg = require('./webpack.cnf');
const clientCfg = require('./webpack.client');
const serverCfg = require('./webpack.server');

const wp = webpack([clientCfg, serverCfg]);

wp.compilers.forEach((compiler) => compiler.watch({}, (err, stats) => {
    console.log(stats.toString({
        colors: true,
        modules: false,
        hash: false,
        version: false
    }));
}));

const nodemon = require('nodemon');

nodemon({
    script: 'dist/server.webpacked.js',
    watch: ['dist/**/*.js']
});

// nodemon.on('start', function () {
//     console.log('App has started');
//     // browserSync.reload();
// }).on('quit', function () {
//     console.log('App has quit');
// }).on('restart', function (files) {
//     console.log('App restarted due to: ', files);
// });

const livereload = require('livereload');
const lrserver = livereload.createServer({
    delay: 1000
});
const path = require('path');
// lrserver.watch([path.resolve('dist2'), path.resolve('dist')]);
lrserver.watch([path.resolve('dist')]);
