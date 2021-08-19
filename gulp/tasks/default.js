const gulp = require('gulp');

require('require-dir')('.', {recurse: true});

gulp.task('default', gulp.series(
    'iconfont',
    'sprite:svg',
    'sprite:png',
    'pug',
    'sass',
    'copy',
    'watch'
));
