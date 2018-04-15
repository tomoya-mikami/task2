var gulp = require('gulp');
var typescript = require('gulp-typescript');


gulp.task('ts', function() {

    //出力オプション
    var options =  {
        out: 'main.js'
    };

    gulp.src([
           './src/js/*.ts',
           '!./node_modules/**'//node_modules配下は除外する
         ])
        .pipe(typescript(options))
        .pipe(gulp.dest('./www/dest'));
});