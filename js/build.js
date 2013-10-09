var marked = require("marked");
var _ = require("underscore");
var fs = require("fs");
var path = require("path");

var cfig = JSON.parse(fs.readFileSync("data/blogconfig.json"));
// commands:
	// build
dispatchCommands();

function dispatchCommands() {
	var arr = process.argv.slice(2);
	if (_.contains(arr, "data")) makeData();
	if (_.contains(arr, "build")) buildAll();
}

function makeData() {
	var rawStats = getFileStats(cfig["postdir"]);
	var newStats = _.map(rawStats, function(val) {
		var filtered = {
			name: val.path,
			path: getDestPath(val.path),
			created: val.stats.mtime,
			modified: val.stats.mtime
		};
		return filtered;
	});

	var dataset = JSON.parse(fs.readFileSync(cfig["postdata"]));

	for (var i = dataset.length - 1; i >= 0; --i) {
		var datum = dataset[i];
		
		var match = false;
		for (var j = newStats.length - 1; j >= 0; --j) {
			var stats = newStats[i];
			if (stats.name === datum.name) {
				match = stats;
				newStats.splice(j, 1);
				break;
			}	
		}

		if (match) {
			_.extend(datum, _.pick(match, "path", "modified"));
			if (!datum.created || new Date(match.created) < new Date(datum.created)) {
				datum.created = match.created;
			}
		} else {
			dataset.splice(i, 1);
		}
	}

	dataset = dataset.concat(newStats);

	fs.writeFile(cfig["postdata"], JSON.stringify(dataset), function() {
		console.log("successfully updated post data");
	});
}

// recursively get information about a file
function getFileStats(filePath) {
	var stats = fs.lstatSync(filePath);
	if (stats.isDirectory()) {
		var contents = getContents(filePath);
		return _.reduce(contents, function(memo, name) {
			var fileStats = getFileStats(filePath+path.sep+name);
			var filteredStats = _.isArray(fileStats) ? fileStats.filter(function(f) { return !!f; }) : fileStats;
			return filteredStats ? memo.concat(filteredStats) : memo;
		}, []);
	} else if (path.extname(filePath) === ".md") {
		return {
			path: filePath,
			stats: stats
		};
	} else {
		return false;
	}
}

function buildAll() {
	var allPosts = processSourcePath(cfig["postdir"]);
	_.each(allPosts, function(post) {
		var destPath = getDestPath(post.path);
		processDestPath(destPath, post.contents, function(error) {
			if (error) console.error(error, "while creating", destPath);
			console.log("successfully wrote: ", destPath);
		});
	});
}

function getContents(folder) {
	return fs.readdirSync(folder).filter(function(f) {
		return f.charAt(0) !== '.';
	});
}

// recursively process the contents of a given file path
function processSourcePath(filePath) {
	if (fs.lstatSync(filePath).isDirectory()) {
		var dirContents = getContents(filePath);
		return _.reduce(dirContents, function(memo, name) {
			var fileContents = processSourcePath(filePath+path.sep+name);
			var filteredContents = _.isArray(fileContents) ? fileContents.filter(function(f) { return !!f; }) : fileContents;
			return filteredContents ? memo.concat(filteredContents) : memo;
		}, []);
	} else if (path.extname(filePath) === ".md") {
		var fileString = fs.readFileSync(filePath).toString();
		return {
			path: filePath,
			contents: marked(fileString)
		};
	} else {
		return false;
	}
}

function getDestPath(path) {
	path = path.replace(new RegExp(cfig["postdir"]), cfig["destdir"]);
	path = path.replace(".md", ".html");
	return path;
}

// base code for this from http://stackoverflow.com/questions/7871058/recursive-directory-creation-for-node-js-0-5-x
// (translated out of coffeescript, with some of the catches for different errors removed b/c not running on Windows + like to live dangerously)
// this is some seriously asynchronous/recursive file I/O
function processDestPath(goalPath, contents, callback) {
	// try the path given
	fs.stat(goalPath, function(err, stat) {
		if (err) {
			// directory doesn't exist, recur
			// try at one higher level, set a callback that will create the hoped-for directory
			// when some version of this function is successful
			var newPath = goalPath.substr(0, goalPath.lastIndexOf("/"));
//			console.log("recurring from: ", goalPath, "to: ", newPath);
			// contents for this higher level path are unimportant - what matters is the callback,
			// which creates the directory and calls back the next step
			processDestPath(newPath, null, function(err) {
				if (err) {
					// pass thrown errors up the recursion chain
					callback(err);
				} else {
					if (!path.extname(goalPath)) {
						fs.mkdir(goalPath, function(err) {
							if (err && err.errno !== 47) {
								// unknown mkdir error - should be passed back up the chain
								callback(err);
							} else {
								// err.errno === 47 means directory already exists, so go ahead with next callback
//								console.log("created: ", goalPath);
								callback(false);
							}
						});
					} else {
						fs.writeFile(goalPath, contents, callback);
					}
				}
			});
		} else {
			// directory exists, go ahead with next step
//			console.log("found: ", goalPath);
			callback(false);
		}
	});
}