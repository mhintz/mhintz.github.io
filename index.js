let Metalsmith = require('metalsmith');
let markdown = require('metalsmith-markdown');
let layouts = require('metalsmith-layouts');
let permalinks = require('metalsmith-permalinks');

let devmode = process.env.MODE === 'development';

Metalsmith(__dirname)
  .metadata({
    title: "Mark Hintz",
    siteurl: devmode ? "http://localhost:8080" : "http://www.markhz.com"
  })
  .source('./src')
  .destination('./_site')
  .clean(true)
  .use(markdown())
  .build((err, files) => {
    if (err) { throw err; }
  });
