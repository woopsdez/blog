var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var git         = require('gulp-git');
var imageResize = require('gulp-image-resize');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var minimist    = require('minimist');
var runSequence = require('run-sequence');
const del       = require('del')
const imagemin  = require('gulp-imagemin');
const pngquant  = require('imagemin-pngquant');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

/**
 * Build the Jekyll Site
 */
var messages = {jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'};
// var option = minimist(process.argv.slice(2));
// var config = {localBuild: '_config.yml,_config_dev.yml'};
// if (option['e'] === 'production') {
//     config = {option:'', yml: ''};
// } else {
//     config = {option:'--config' ,yml: '_config.yml,_config_dev.yml'};
// };

gulp.task('jekyll-build', function (done) {
    // console.log(option['e']);
    // console.log(config.option, config.yml);
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Resize & Optimize Image
 */ 
gulp.task('del-image', function() {
    del(['_site/content/']);
});

gulp.task('image',['del-image'], function() {
    gulp.src('content/images/**/**/**/*.{jpg,png}', {base:'content/images/'})
    .pipe(imageResize({width : 1000}))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('_site/content/images/'));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/screen.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/*.scss', ['sass']);
    gulp.watch(['*.md', '_layouts/*.html', '_includes/*.html', '_posts/*', '_drafts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */ 
gulp.task('default', ['browser-sync', 'watch']);

// 本番環境にのみ残しておきたい記事があるため、完全同期のhookではなく、ファイル追記のみ行うglynnでデプロイします。
// gulp.task('deploy', function (callback) {
//     runSequence('jekyll-build', 'add', 'commit', 'push', callback);
// });