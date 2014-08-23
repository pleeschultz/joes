var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-sass');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var exec = require('gulp-exec');
var rimraf = require('gulp-rimraf');

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
		.pipe(rimraf());
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

gulp.task('build-compress', ['require-js-clean'], function(){

    var src = ['./build/**', './build/.*'];

    return gulp.src(src)
        .pipe(tar('build.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('./'));
});

gulp.task('upload', ['build-compress'], function(){

	var scpLogin = 'scp build.tar.gz sebastianjoesicecream.com@s191172.gridserver.com'
    var uploadDir = '~/domains/flavors.sebastianjoesicecream.com/tmp/';

	var sshLogin = 'ssh sebastianjoesicecream.com@s191172.gridserver.com';
	var scpCommand = scpLogin + ':' + uploadDir + 'build.tar.gz';

    var sshCommands = [
        'cd ' + uploadDir,
        'tar -xvzf build.tar.gz',
    	'rm -rf ../html',
    	'mv -f build/web/ ../html',
    //     'rm -rf ../node-services',
    //     'mv -f build/node-services/ ../',
    //     'mv -f build/app.js ../',
    //     'mv -f build/package.json ../',
    //     'npm install --production',
    //     'stop node-simple-http-daemon',
    //     'start node-simple-http-daemon',
    //     'stop node-simple-https-daemon',
    //     'start node-simple-https-daemon',
    	'rm -rf build build.tar.gz'
    ].join(';');

    var commands = [
        scpCommand,
		sshLogin + ' "' + sshCommands + '"'
    ].join(';');

    return gulp.src('')
        .pipe(exec(commands, { silent: false }));
});
