const gulp    = require('gulp'),
    config  = require('../config.js'),
    pug     = require('gulp-pug');


gulp.task('pug', function(done){
    gulp.src(config.src.templates + '/**/[^_]*.pug')
        .pipe(
            pug({
                pretty: !!config.production,
            })
        )
        .pipe(gulp.dest(config.dest.html));

    done();
});

gulp.task('pug:watch', function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.pug'
    ], gulp.series('pug'));

    gulp.watch([
        config.src.templates + '/**/_*.pug'
    ], gulp.series('pug'));
});
