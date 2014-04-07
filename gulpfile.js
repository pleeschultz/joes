var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-sass');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var exec = require('gulp-exec');

gulp.task('default', ['sass'], function() {
	gulp.watch('./web/sass/**', ['sass']);
});

gulp.task('sass', function () {
	return gulp.src('./web/sass/screen.scss')
		.pipe(sass())
		.pipe(gulp.dest('./web/css'));
});

/* ================= Deploy ================== */

/* clean build */
gulp.task('build-reset', ['sass'], function(){
	return gulp.src('./build', { read: false })
		.pipe(clean({ force: true }));
});

gulp.task('build-copy', ['build-reset'], function(){
	return gulp.src(['web/**', '!./web/sass{,/**}', '!./web/js{,/**}'])
		.pipe(gulp.dest('./build/web'));
});

gulp.task('require-js-build', ['build-copy'], function(){
	var commands = [
		'node r.js -o build.js'
	].join(';');

	return gulp.src('')
		.pipe(exec(commands, { silent: false }));
});

gulp.task('require-js-clean', ['require-js-build'], function(){
	return gulp.src([
			'./build/web/js/*',
			'!./build/web/js/libs',
			'./build/web/js/libs/*',
			'!./build/web/js/libs/require.js',
			'!./build/web/js/index.js'
		], { read: false })
		.pipe(clean({ force: true }));
});

gulp.task('deploy-test', ['require-js-clean'], function(){
	return gulp.src(['./build/web/js/*'])
		.pipe(uglify())
		.pipe(gulp.dest('build/web/js'));
});
