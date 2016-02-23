var through = require('through2');
//var util = require('gulp-util');

var proccessedList = [];

var buildBlockRegEx = /<!-- build:(css|js) ([\S]+) -->([\s\S]*?)<!-- endbuild -->/gm;
var startBuildTagRegEx = /<!-- build:(css|js) ([\S]+) -->/gm;

module.exports = {
	
	removeContentUrl: function(options) {
		return through({objectMode: true}, function(file, encoding, cb) {
			var contents = file.contents.toString();
			var block = contents.match(buildBlockRegEx);
			
			options = options = {};
			
			var input = options.input || '@Content.url("~{URL}")';
			input = new RegExp(input.replace("{URL}", "__URL__").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace("__URL__", "(.*)"), 'gm');
			
			if(block.length) {
				for(var i = 0; i < block.length; i++) {
					var output = block[i].replace(input, "$1");
					contents = contents.replace(block[i], output);
					
					var reference = block[i].match(startBuildTagRegEx)[0];
					proccessedList.push(reference.replace(startBuildTagRegEx, "$2"));
				}
			}
			
			file.contents = new Buffer(contents);

			cb(null, file);
		});
	},
	
	revertContentUrl: function(prefix) {
		return through({objectMode: true}, function(file, encoding, cb) {
			var contents = file.contents.toString();
			
			prefix = prefix || "";
			
			if(proccessedList.length) {
				for(var i = 0; i < proccessedList.length; i++) {
					contents = contents.replace(proccessedList[i], '@Content.url("~/' + prefix + proccessedList[i] + '")');
				}
			}
			
			file.contents = new Buffer(contents);

			cb(null, file);
		});
	}
	
}
