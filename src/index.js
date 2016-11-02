let Metalsmith = require('metalsmith');
let debug = require('metalsmith-debug');
let markdown = require('metalsmith-markdown');
let permalinks = require('metalsmith-permalinks');
let drafts = require('metalsmith-drafts');
let collections = require('metalsmith-collections');

let ld = require('lodash');

// Implemented my own recursive template layouts thing like Jekyll has
let layouts = require('./layouts');

let devmode = process.env.MODE === 'development';

Metalsmith(__dirname)
  // Basic stuff
  .source('../content')
  .destination('../build')
  .clean(true)
  // Core stuff
  .metadata({
    mdSiteTitle: 'Mark Hintz',
    mdSiteUrl: devmode ? 'http://localhost:8080' : 'http://www.markhz.com',
    mdTwitterUrl: 'https://twitter.com/MarkHintz',
    mdGithubUrl: 'http://www.github.com/mhintz',
    mdEmailTo: ['com', String.fromCharCode(46), 'gmail', String.fromCharCode(64), 'hintz', 'o', 'mark', 'mailto:'].reverse().join(''),
  })
  .use(drafts())
  // Set up permalinks first, this changes the path of the file
  .use(permalinks({
    relative: false,
    pattern: ':path',
    date: 'YYYY-MM-DD',
  }))
  // Now that metadata is properly set up, compile all the contents
  // First transpile markdown contents so everything is html
  .use(markdown())
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
  .build(function(err, fileList) {
    if (err) { throw err; }
  });


