var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', function(){
    gulp.src([
        './src/js/*js',
        '!./node_modules/**'//node_modules配下は除外する
    ]).pipe(concat('script.js'))
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