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

gulp.task('nodemon', () => {
    const nodemon = require('nodemon');
    const nm = nodemon({ script: 'generator/index.js', ext: 'js html yaml md nedb', watch: 'generator' });
    nm.on('restart', (fileChanged) => {
        console.log('Regenerating');
    });
});

gulp.task('web', () => {
    const superstatic = require('superstatic');
    const connect = require('connect');
    
    const app = connect().use(superstatic({
        cwd: 'dist',
        config: {
            cleanUrls: true
        }
    }));
    
    app.listen(3000);
});

gulp.task('webpack', () => {
    const webpack = require('webpack');
    const webpackConfig = require('./generator/webpack.config');

    webpackConfig.watch = config.watch;

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stats.toString({
            modules: false,
            colors: true
        }));
        // if (err || stats.hasErrors()) {
        //     console.error('ERROR');
        //     return console.error(err);
        // }

        // console.log();
    });
});

gulp.task('dev', ['dev-mode', 'web', 'nodemon', 'webpack']);
gulp.task('build', ['webpack'], () => {
    require('./generator/index');
});


// gulp.task('webpack', (done) => {
//     const webpack = require('webpack');
//     const serverCfg = Object.assign({}, require('./webpack.server'), { watch: config.watch });
//     const clientCfg = Object.assign({}, require('./webpack.client'), { watch: config.watch });

//     const writeStats = (err, stats) => {

//         // if (err || stats.hasErrors()) {
//         //     // Handle errors here
//         //     console.error(err);
//         // }

//         console.log(stats.toString({
//             colors: true,
//             modules: false,
//             hash: false,
//             version: false
//         }));

//         if (!config.watch) {
//             done();
//         }
//     };
    
//     webpack([serverCfg, clientCfg], writeStats);
// });

// gulp.task('nodemon', () => {
//     const nodemon = require('nodemon');
//     nodemon('--inspect --watch dist --ignore dist/main.js dist/server.webpacked.js');
// });

// gulp.task('livereload', () => {
//     const path = require('path');
//     const livereload = require('livereload').createServer({ delay: 1000 });
//     livereload.watch([path.resolve('dist')]);
// });

// gulp.task('eslint', () => {
//     const eslint = require('gulp-eslint');
//     return gulp.src(['./src/**/*.js','!node_modules/**'])
//         .pipe(eslint())
//         .pipe(eslint.format());
// });

// gulp.task('eslint:fix', () => {
//     const eslint = require('gulp-eslint');
//     const gulpIf = require('gulp-if');

//     const isFixed = file => file.eslint != null && file.eslint.fixed;

//     return gulp.src('./src/**/*.js')
//         .pipe(eslint({ fix: true }))
//         .pipe(eslint.format())
//         .pipe(gulpIf(isFixed, gulp.dest('./src')));
// });

// gulp.task('build', ['webpack']);
// gulp.task('dev', ['dev-mode', 'build', 'nodemon', 'livereload']);
