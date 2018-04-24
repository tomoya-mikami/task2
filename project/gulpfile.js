var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', function(){
    gulp.src([
        './src/data/develop/*js',
        './src/js/*js',
        '!./node_modules/**'//node_modules配下は除外する
    ]).pipe(concat('script.js'))
    .pipe(gulp.dest('./www/dest'));
});

gulp.task('staging', function(){
    gulp.src([
        './src/data/staging/*js',
        './src/js/*js',
        '!./node_modules/**'//node_modules配下は除外する
    ]).pipe(concat('script_staging.js'))
    .pipe(gulp.dest('./www/dest'));
});

gulp.task('production', function(){
    gulp.src([
        './src/data/production/*js',
        './src/js/*js',
        '!./node_modules/**'//node_modules配下は除外する
    ]).pipe(concat('script_production.js'))
    .pipe(gulp.dest('./www/dest'));
});

gulp.task('ts', function() {

    //出力オプション
    var options = {
        out: 'main.js'
    };

    gulp.src([
           './src/ts/*.ts',
           '!./node_modules/**'//node_modules配下は除外する
         ])
        .pipe(typescript(options))
        .pipe(gulp.dest('./www/dest'));
});