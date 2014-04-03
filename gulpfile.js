var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-sass');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var exec = require('gulp-exec');
var rjs = require('gulp-requirejs');

gulp.task('sass', function () {
	return gulp.src('./web/sass/screen.scss')  
		.pipe(sass())
		.pipe(gulp.dest('./web/css'));
});

gulp.task('default', ['sass'], function() {
	gulp.watch('./web/sass/**', ['sass']);
});

/* ================= REQUIRE test ================== */

gulp.task('require-build', [], function(){

		rjs({
			baseUrl: 'public/js/libs',
			paths: {
				// libs
				jquery: 'jquery-1.11.0.min',
				underscore: 'underscore-min',
				backbone: 'backbone-min',
				tween: 'non-amd-tween-loader', // non AMD TweenLite loader
				swiper: 'non-amd-swiper-loader', // non AMD Swiper loader
				hammer: 'hammer.min',

				// modules
				app: '../app',
				content: '../content',
				tcin: '../tcin',
				routes: '../routes',
				services: '../services',
				tracking: '../tracking'
			},
			shim: {
				swiper: {
					deps: [
						'idangerous.swiper-2.1.min.js'
					]
				},
				tween: {
					deps: [
						'gs/TweenMax.min.js'
					]
				}
			},
        	name: "../requireConfig",
        	out: 'requireConfig.js'
    	})
    	.pipe(uglify())
        .pipe(gulp.dest('./build/public/js')); // pipe it to the output DIR
});

/* ================= Deploy ================== */

/* clean build */
gulp.task('build-reset', ['sass'], function(){
	return gulp.src('./build', { read: false })
		.pipe(clean({ force: true }));
});

/* copy root files */
gulp.task('build-copy-root', ['build-reset'], function () {
	return gulp.src(['public/_root/**'])
		.pipe(gulp.dest('build'));
});

/* copy public files */
gulp.task('build-copy-public', ['build-copy-root'], function () {
	return gulp.src('public/**')
		.pipe(gulp.dest('build/public'));
});

/* copy public files
gulp.task('build', ['build-copy-public'], function () {
	return gulp.src(['./build/public/sass', './build/public/_root'])
		.pipe(clean({ force: true }));
});
*/
/* copy public files */
gulp.task('build-clean', ['build-copy-public'], function () {

	gulp.src(['./build/public/sass', './build/public/_root'])
		.pipe(clean({ force: true }));
});

/* copy public files
gulp.task('build', ['build-clean'], function () {
	return gulp.src(['./build/public/js/**'])
		.pipe(uglify())
		.pipe(gulp.dest('build/public/js'));
});

*/

gulp.task('build-move', ['build-clean'], function () {

	gulp.src(['public/js/libs/require.js'])
		.pipe(gulp.dest('./build/public/js/libs'));
});


gulp.task('build', ['build-clean'], function(){

		rjs({
			baseUrl: 'public/js/libs',
			paths: {
				// libs
				jquery: 'jquery-1.11.0.min',
				underscore: 'underscore-min',
				backbone: 'backbone-min',
				tween: 'non-amd-tween-loader', // non AMD TweenLite loader
				swiper: 'non-amd-swiper-loader', // non AMD Swiper loader
				hammer: 'hammer.min',

				// modules
				app: '../app',
				content: '../content',
				tcin: '../tcin',
				routes: '../routes',
				services: '../services',
				tracking: '../tracking'
			},
			shim: {
				swiper: {
					deps: [
						'idangerous.swiper-2.1.min.js'
					]
				},
				tween: {
					deps: [
						'gs/TweenMax.min.js'
					]
				}
			},
			name: "../requireConfig",
			out: 'requireConfig.js'
		})
		.pipe(uglify())
		.pipe(gulp.dest('./build/public/js')); // pipe it to the output DIR
});

//
gulp.task('compress-build', ['build'], function(){
	console.log('compressing');
	return gulp.src(['./build/**', './build/.*'])
		.pipe(tar('build.tar'))
		.pipe(gzip())
		.pipe(gulp.dest('./'));
});

// gulp deploy --habitat dev --split a
gulp.task('deploy', ['compress-build'], function(){
	console.log('uploading to server');

	var domain = util.env.domain;
	var version = util.env.split;

	var sshCommands = [
		'cd /srv/www/stage.targetpivot.com/tmp',
		'tar -xvzf build.tar.gz',
		'rm -rf ../' + domain + '/' + version,
		'mv -f build/public/ ../'+ domain +'/' + version,
		'rm -rf build build.tar.gz unpack.sh'
	].join(';');

	var commands = [
		'scp build.tar.gz root@172.17.100.41:/srv/www/stage.targetpivot.com/tmp/build.tar.gz',
		'rm build.tar.gz',
		'ssh root@172.17.100.41 "' + sshCommands + '"'
	].join(';');

	gulp.src('')
		.pipe(exec(commands, { silent: false }));
});
 
