# gulp-util-csharp

````
var gulp = require('gulp'),
    useref = require('gulp-useref'),
    util = require('gulp-util'),
	through = require('through2'),
	csharp = require('gulp-useref-csharp'),
	gulpif = require('gulp-if');
	
gulp.task('default', function () {

    return gulp.src('source/views/test/index.html')
		.pipe(csharp.removeContentUrl())
        .pipe(useref({
			searchPath: process.cwd(),
			base: '.'
		}))
		.pipe(gulpif("*.html", csharp.revertContentUrl()))
        .pipe(gulp.dest('v3/views/shared'));

});
````
