var gulp = require("gulp");
var browserSync = require("browser-sync");
var opn = require("opn");

gulp.task('server', function(){
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });

});
gulp.task('watch', function(){
    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/*.js'
    ]).on('change', browserSync.reload);
    opn('http://localhost:9000');
});
gulp.task('default', ['server', 'watch']);