const gulp        = require('gulp');
const { src, watch, series, parallel } = require('gulp');
const dartSass        = require('sass');
const gulpSass        = require('gulp-sass');
const sass = gulpSass(dartSass)
const prefix      = require('gulp-autoprefixer');
const git         = require('gulp-git');
const imageResize = require('gulp-image-resize');
const browserSync = require('browser-sync');
const cp          = require('child_process');
const minimist    = require('minimist');
const runSequence = require('run-sequence');
const del       = require('del')
const imagemin  = require('gulp-imagemin');
const pngquant  = require('imagemin-pngquant');

const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

/**
 * Build the Jekyll Site
 */
const messages = {jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'};
// const option = minimist(process.argv.slice(2));
// const config = {localBuild: '_config.yml,_config_dev.yml'};
// if (option['e'] === 'production') {
//     config = {option:'', yml: ''};
// } else {
//     config = {option:'--config' ,yml: '_config.yml,_config_dev.yml'};
// };

function jekyllBuildTask(cb) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build', '--baseurl', ''], {stdio: 'inherit'})
        .on('close', cb);
}

/**
 * Rebuild Jekyll & do page reload
 */
function jekyllRebuildTask(cb) {
	browserSync.reload();
	cb();
}

/**
 * Wait for jekyll-build, then launch the Server
 */
function browserSyncTask(cb) {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
	cb()
}

/**
 * Resize & Optimize Image
 */
function delImageTask(cb) {
	del(['_site/content/']);
	cb();
}

function imageTask(cb) {
    src('content/images/**/**/**/*.{jpg,png}', {base:'content/images/'})
    .pipe(imageResize({width : 1000}))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('_site/content/images/'));
	  cb();
}

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
function sassTask() {
    return src('assets/css/screen.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
}

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watchTask() {
	watch('assets/css/*.scss', sassTask);
	watch(['*.md', '_layouts/*.html', '_includes/*.html', '_posts/*', '_drafts/*'], series(jekyllBuildTask, jekyllRebuildTask));
}

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */

// 本番環境にのみ残しておきたい記事があるため、完全同期のhookではなく、ファイル追記のみ行うglynnでデプロイします。
// gulp.task('deploy', function (callback) {
//     runSequence('jekyll-build', 'add', 'commit', 'push', callback);
// });

exports.image = series(delImageTask, imageTask)
exports.default = parallel(
	series(sassTask, jekyllBuildTask, browserSyncTask),
	watchTask
)
