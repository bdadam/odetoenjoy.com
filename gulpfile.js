require('babel-register');
require('ignore-styles');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 3000;

const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

const getWebpackConfig = () => {
    const webpackDevConfig = require('./webpack.common');
    const webpackProdConfig = require('./webpack.config');

    const config = isProduction()
        ? webpackProdConfig
        : Object.assign(webpackDevConfig, { watch: true });

    return config;
};


gulp.task('nodemon', () => {

    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        open: false,
        ghostMode: false,
        port: 3001,
    });

    const nodemon = require('gulp-nodemon');

    return nodemon({
        script: 'index-dev.js',
        ext: 'js, scss',
        ignore: ['dist/', 'node_modules/'],
        env: {
        }
    })
    .on('restart', () => {
        setTimeout(() => browserSync.reload(true), 2000)
    });
});

gulp.task('set-devmode', () => {
    process.env.NODE_ENV = 'development';
});

gulp.task('webpack_old', () => {
    const webpackStream = require('webpack-stream');
    const webpack = require('webpack');

    return gulp.src('src/client.js')
        .pipe(webpackStream(getWebpackConfig(), webpack))
        .on('error', function (err) {
            this.emit('end');
        })
        .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', () => {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const compiler = webpack(getWebpackConfig());

    const wmw = webpackDevMiddleware(compiler, {
        stats: {
            children: false,
            chunks: false,
            colors: true
        }
    });

    browserSync.init({
        port: 3000,
        open: false,
        ghostMode: false,
        snippetOptions: {
            async: true
        },
        middleware: [
            {
                route: '/assets/haendler',
                handle: wmw
            },
            require('./src/server', require).default
        ],
        files: ['src/**/*'],
        server: 'dist',
        reloadOnRestart: true
    });
});

gulp.task('webpack', () => {
    const webpack = require('webpack');
    const config = getWebpackConfig();
    const compiler = webpack(config);

    const handler = (err, stats) => {
        console.log(stats.toString({
            hash: true,
            assets: true,
            chunks: false,
            children: false,
            colors: true
        }));
    };

    config.watch ? compiler.watch({}, handler) : compiler.run(handler);
});

gulp.task('clean', () => {
    const clean = require('gulp-clean');
    return gulp.src('dist*/**/*', { read: false })
        .pipe(clean());
});

gulp.task('jest', () => {
    const jest = require('jest');
    const jestConfig = require('./package.json').jest;
    jestConfig.watch = true;

    jest.runCLI(jestConfig, ['./']);
});

gulp.task('default', ['start', 'webpack']);
gulp.task('build', ['webpack']);

gulp.task('dev-client', ['set-devmode', 'browser-sync']);
gulp.task('dev-server', ['set-devmode', 'webpack', 'nodemon']);
gulp.task('dev', ['dev-client']);
