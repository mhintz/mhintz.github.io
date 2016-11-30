let Metalsmith = require('metalsmith');
let debug = require('metalsmith-debug');
let markdown = require('metalsmith-markdown');
let permalinks = require('metalsmith-permalinks');
let drafts = require('metalsmith-drafts');
let collections = require('metalsmith-collections');

let ld = require('lodash');
let fs = require('fs-extra');
let path = require('path');

// Implemented my own recursive template layouts thing like Jekyll has
let layouts = require('./layouts');

// Constants

const devmode = process.env.MODE === 'development';

const sourceFolder = '../content';
const destFolder = '../build';

const rawCopyFiles = ['README.md'];

// Let's get down to business

Metalsmith(__dirname)
  // Basic stuff
  .source(sourceFolder)
  .destination(destFolder)
  .clean(true)
  // Core stuff
  .metadata({
    mdSiteTitle: 'Mark Hintz',
    mdSiteUrl: devmode ? 'http://localhost:8000' : 'http://www.markhz.com',
    mdTwitterUrl: 'https://twitter.com/MarkHintz',
    mdGithubUrl: 'http://www.github.com/mhintz',
    mdEmailTo: "['com', String.fromCharCode(46), 'gmail', String.fromCharCode(64), 'hintz', 'o', 'mark', String.fromCharCode(58), 'mailto'].reverse().join('')",
    mdResumeName: "Mark Hintz Resume 2017.pdf"
  })
  .use(drafts())
  .use(function(fileList, _m, done) {
    // Ignore anything in rawCopyFiles - this will just get copied over at the end
    Object.keys(fileList).forEach((fileName) => {
      if (rawCopyFiles.indexOf(fileName) !== -1) { delete fileList[fileName]; }
    });
    done();
  })
  // First transpile markdown contents so everything is html
  .use(markdown())
  // Set up permalinks - this changes the path of the file
  .use(permalinks({
    relative: false,
    pattern: ':path',
    date: 'YYYY-MM-DD',
  }))
  .use(function(fileList, _metalsmith, done) {
    // Add the file name as the 'filePath' attribute on each file object
    ld.forOwn(fileList, function(fileData, fileName) {
      if (typeof fileData.filePath !== 'undefined') {
        throw new Error('error: file object for ' + fileName + ' already has a "filePath" attribute');
      }
      fileData.filePath = fileName;
    });
    done();
  })
  // Set up collections, these match against the final path of each object
  .use(collections({
    clExplorations: {
      pattern: 'posts/explorations/**/*',
    },
    clSpeaking: {
      pattern: 'posts/speaking/**/*',
    },
  }))
  .use(layouts({
    engine: 'handlebars',
    layouts: 'layouts',
    partials: 'layouts',
    pattern: ['**/*.html', '**/*.md'],
    params: {
      strict: true,
      assumeObjects: true,
    },
  }))
  // Ship it!
  .build(function(err, fileList) {
    if (err) { throw err; }
  });

// Copy over any pesky stuff that you wanted ignored by metalsmith but still present at the end...
rawCopyFiles.forEach((fileName) => {
  let src = path.join(__dirname, sourceFolder, fileName);
  let dst = path.join(__dirname, destFolder, fileName);
  fs.copy(src, dst);
});
