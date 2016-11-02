let Metalsmith = require('metalsmith');
let debug = require('metalsmith-debug');
let markdown = require('metalsmith-markdown');
let layouts = require('metalsmith-layouts');
let permalinks = require('metalsmith-permalinks');
let drafts = require('metalsmith-drafts');
let collections = require('metalsmith-collections');

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
  // Set up collections second, these match against the permalink path
  .use(collections({
    clExplorations: {
      pattern: 'posts/explorations/**/*',
    },
    clSpeaking: {
      pattern: 'posts/speaking/**/*',
    },
  }))
  .use(function(files, metalsmith, done) {
    console.log(metalsmith.metadata());
    // Add the file name as the 'filePath' attribute 
    setImmediate(done);
    Object.keys(files).forEach(function(fileName) {
      if (typeof files[fileName].filePath !== 'undefined') {
        throw new Error('error: file object for ' + fileName + ' already has a "filePath" attribute');
      }
      files[fileName].filePath = fileName;
    });
  })
  // Now that metadata is properly set up, compile all the contents
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    partials: 'layouts',
    default: 'default.html',
    // Options for Handlebars, not used by metalsmith-layouts
    strict: true,
    assumeObjects: true,
  }))
  .build((err, files) => {
    if (err) { throw err; }
  });
