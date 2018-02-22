import del from 'del';
import childProcess from 'child_process';
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import header from 'gulp-header';
import runSequence from 'run-sequence';
import webpackStream from 'webpack-stream'; // using webpack@^3.4.1

let branch = undefined;
const getHeader = () =>
    [
        '/**',
        ' * current-branch is: ' + branch,
        ' *',
        ' * Copyright (c) 2018-present, bochen2014@yahoo.com',
        ' *',
        ' * This source code is licensed under the MIT license found in the',
        ' * LICENSE file in the root directory of this source tree.',
        ' */',
    ].join('\n') + '\n';

gulp.task('clean', () => {
    del('./lib');
});

gulp.task('getVer', (cb) => {
    const child = childProcess.spawn(
        'git',
        [   'rev-parse',
             '--abbrev-ref',
            'HEAD'],
    );

    child.stdout.on('data', function (data) {
        branch = data;
    });
    child.on('close', (exitCode) => {
        cb();
    });
})
gulp.task('webpack', () => {
    return gulp
        .src('src/index.js')
        .pipe(webpackStream(
            require('./webpack.config.js'),
            null /*use webppack-stream shipped webpack*/,
            (err, stats) => {
                if (err) {
                    throw new gulpUtil.PluginError('webpack', err);
                }
                if (stats.compilation.errors.length) {
                    throw new gulpUtil.PluginError('webpack', stats.toString());
                }
            }))
        .pipe(header(getHeader()))
        .pipe(gulp.dest('./lib'))
})


gulp.task('default', cb => {
    runSequence('clean', 'getVer', 'webpack');
})