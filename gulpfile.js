const gulp = require('gulp');

const config = {
    env: 'production',
    watch: false
};

process.env.NODE_ENV = 'production';

gulp.task('dev-mode', () => {
    process.env.NODE_ENV = 'development';
    config.watch = true;
});

gulp.task('webpack', () => {
    const webpack = require('webpack');
    const clientCfg = require('./webpack.client');
    const serverCfg = require('./webpack.server');

    const writeStats = (err, stats) => {
        console.log(stats.toString({
            colors: true,
            modules: false,
            hash: false,
            version: false
        }));
    };

    const compile = compiler => compiler.run(writeStats);
    const watch = compiler => compiler.watch({}, writeStats);

    webpack([clientCfg, serverCfg]).compilers.forEach(config.watch ? watch : compile);
});

gulp.task('nodemon', () => {
    const nodemon = require('nodemon');
    nodemon({
        script: 'dist/server.webpacked.js',
        watch: ['dist/**/*.js']
    });
});

gulp.task('livereload', () => {
    const path = require('path');
    const livereload = require('livereload').createServer({ delay: 1000 });
    livereload.watch([path.resolve('dist')]);
});

gulp.task('build', ['webpack']);
gulp.task('dev', ['dev-mode', 'build', 'nodemon', 'livereload']);
