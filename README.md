# gulp-util-csharp

## Install

Install with [npm](https://npmjs.org/)

```
npm install --save-dev https://github.com/BillyBlaze/gulp-util-csharp/tarball/master
```


## Usage

The following example will replace `@Content.url()` calls within a building blocks, it replace them with the specified value, after other gulp tasks have completed, we will restore all the `@Content.url()` calls

```js
var gulp = require('gulp'),
	useref = require('gulp-useref'),
	csharp = require('gulp-util-csharp'),
	gulpif = require('gulp-if');
	
gulp.task('default', function () {

	return gulp.src('source/views/_MasterLayout.html')
		.pipe(csharp.removeContentUrl())
		.pipe(useref({
			searchPath: process.cwd(),
			base: '.'
		}))
		.pipe(gulpif("*.html", csharp.revertContentUrl()))
        	.pipe(gulp.dest('dist/views/shared'));

});
```
