var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require("gulp-inject");
var test = require('./gulp-plugins/parse-flavors/index.js');

gulp.task('test', function() {
  // place code for your default task here
  	console.log(gutil.env);
	gulp.src('./flavors/flavor-list.txt')
		.pipe(test())
		//.pipe(gulp.dest('./flavors/flavor-list-build.json'));
  
});