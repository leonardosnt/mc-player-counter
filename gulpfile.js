'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const iife = require('gulp-iife');
const rename = require('gulp-rename');
const insert = require('gulp-insert');

const LICENSE_HEADER = `/*!
 * https://github.com/leonardosnt/mc-player-counter
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */
`;

gulp.task('default', ['build']);

gulp.task('build', () => (
  gulp.src('src/mc-player-counter.js')
    .pipe(babel())
    .pipe(iife({ useStrict: false }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename('mc-player-counter.min.js'))
    .pipe(uglify())
    .pipe(insert.prepend(LICENSE_HEADER))
    .pipe(gulp.dest('dist/'))
));