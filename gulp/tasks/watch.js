const gulp = require('gulp');

gulp.task('watch', gulp.parallel('sass:watch', 'sprite:svg:watch', 'iconfont:watch', 'copy:watch', 'pug:watch'));
