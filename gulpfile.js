'use strict';
const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const del = require('del');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const modRewrite = require('connect-modrewrite');
const copy = require('gulp-copy');
const browserSync = require('browser-sync').create();

gulp.task('copy-img', function() {
    return gulp.src('./src/img/*.png')
      .pipe(gulp.dest('./dist/img'));
  });

gulp.task('clean', function() {
    return del(['dist/**']);
  });

  gulp.task('copy-html', function() {
    return gulp.src('./src/**/*.html')
      .pipe(gulp.dest('./dist'))
  });

  gulp.task('copy-css', function() {
    return gulp.src('./src/**/*.css')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'))
  });

  gulp.task('copy', gulp.series('copy-img','copy-html', 'copy-css'));


  gulp.task('concat', function() {
    return gulp.src('./src/**/*.js')
    //   .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/js'));
  });

  gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
        baseDir: './dist',
    },
    middleware: [
        modRewrite([
            '^/(.*)\\.css$ /$1.css [L]',
        ]),
        function (req, res, next) {
            if (/\.css$/.test(req.url)) {
                res.setHeader('Content-Type', 'text/css');
            }
            next();
        }
    ],
    port: 8000
  });
  gulp.watch('./src/**/*.html', gulp.series('copy-html')).on('change', browserSync.reload);
  // gulp.watch('./src/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch('./src/**/*.css', gulp.series('copy-css')).on('change', browserSync.reload);
  gulp.watch('./src/**/*.js', gulp.series('concat')).on('change', browserSync.reload);
});

gulp.task('open', function() {
    return gulp.src('./dist/index.html')
      .pipe(open());
  });


  gulp.task('serve', gulp.series('clean', 'copy', 'sass', 'concat','server','open', function() {
    
  }));

gulp.task('default', gulp.series('serve'));
