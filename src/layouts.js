// Choice of template engine is configurable
// Each file that wants to be processed specifies a 'layout' file
// All files thus indicated first have their contents processed as a template themselves, giving results
// Then the results are processed into the 'layout' file, giving results
// If the layout file *itself* specifies a 'layout', that layout will be compiled with the previous results
// And so on, recursively
// If at any point in the recursive chain, an already-used 'layout' file is re-used, the process exits with
// an infinite recursion error (since this would create an infinite loop)
// Recursion stops when a 'layout' file is encountered that doesn't itself refer to a 'layout' file
// Then the result is set as the new file contents
// It's possible to configure:
//  - Templating engine
//  - location of layouts folder (default 'layouts')
//  - a partials folder, the contents of which will be attached to the rendering engine
//  - a (multi-)pattern to match againt file names; only those names which match the pattern(s) will be processe
//  - a 'params' sub-object, which will be passed to the template renderer

let consolidate = require('consolidate');
let multimatch = require('multimatch');
let utf8 = require('is-utf8');
let readdirrec = require('fs-readdir-recursive');
let path = require('path');
let fs = require('fs-extra');
let parseFrontMatter = require('gray-matter');
let ld = require('lodash');
let async = require('async');

function fileCheck(fileName, fileData, pattern) {
  // Check that fileData actually has a 'layout' attribute
  if (!fileData.hasOwnProperty('layout')) { return false; }
  // Check that fileName matches the provided pattern
  if (pattern && !multimatch(fileName, pattern).length) { return false; }
  // Check that the file contents are utf-8 encoded (no binary)
  if (!utf8(fileData.contents)) { return false; }
  // All checks passed
  return true;
}

function compileLayoutsList(allLayouts, fileData) {
  if (!fileData.layout) { return []; }
  let list = [];
  let layoutSet = {};
  const addL = (l) => {
    list.push(l);
    layoutSet[l] = true;
    let nextL = allLayouts[l].data.layout;
    if (nextL) {
      if (layoutSet[nextL]) {
        // Layout has already been added to the list, this means there's an infinite layout-reference loop
        throw new Error('layouts: infinite layout-reference loop detected after: [' + list + ']');
      } else {
        addL(nextL);
      }
    }
  };
  addL(fileData.layout);
  return list;
}

module.exports = function(opts) {
  opts = opts || {};

  let engine = opts.engine ? consolidate[opts.engine] : consolidate.handlebars;
  let layoutsFolder = opts.layouts || 'layouts';
  let partialsFolder = opts.partials;
  let pattern = opts.pattern;
  let params = opts.params || {};

  return function(fileList, metalsmith, pluginDone) {
    let metalsmithBasePath = metalsmith.path();
    let metalsmithMetadata = metalsmith.metadata();

    let layoutsAbsolute = path.isAbsolute(layoutsFolder) ? layoutsFolder : path.join(metalsmithBasePath, layoutsFolder);
    let partialsAbsolute = !partialsFolder ? false : (path.isAbsolute(partialsFolder) ? partialsFolder : path.join(metalsmithBasePath, partialsFolder));

    // Get an index of the layouts and their contents
    let layoutsByName = readdirrec(layoutsAbsolute)
      .reduce((memo, layoutName) => {
        let absName = path.join(layoutsAbsolute, layoutName);
        let contents = fs.readFileSync(absName).toString();
        let parsed = parseFrontMatter(contents);
        memo[layoutName] = {
          data: parsed.data,
          template: parsed.content,
        };
        return memo;
      }, {});

    // Set up partials listings
    params.partials = (!partialsAbsolute ? [] : readdirrec(partialsAbsolute))
      .reduce((memo, partialName) => {
        let fileInfo = path.parse(partialName);
        let baseName = path.join(fileInfo.dir, fileInfo.name); // relative name without the extension
        let absName = path.join(partialsAbsolute, partialName);
        memo[baseName.replace(/\\/g, '/')] = fs.readFileSync(absName).toString();
        // let relName = path.relative(layoutsAbsolute, path.join(partialsAbsolute, baseName));
        // memo[baseName.replace(/\\/g, '/')] = relName;
        return memo;
      }, {});

    let fileNames = Object.keys(fileList).filter((fileName) => fileCheck(fileName, fileList[fileName], pattern));

    async.each(fileNames, (fileName, fileDone) => {
      let fileData = fileList[fileName];
      let templateParams = ld.extend({}, params, metalsmithMetadata, fileData);
      let templateContents = fileData.contents.toString();

      let renderPromise = engine.render(templateContents, templateParams);

      compileLayoutsList(layoutsByName, fileData)
        .forEach((layoutName) => {
          renderPromise = renderPromise.then((rendered) => {
            templateParams.contents = rendered;
            return engine.render(layoutsByName[layoutName].template, templateParams);
          });
        });

      renderPromise
        .then((finalContents) => {
          // Finished with the chain
          fileData.contents = new Buffer(finalContents);
          fileList[fileName] = fileData;
          fileDone();
        })
        .catch((err) => { throw err; });

      return true;
    }, pluginDone);
  }
}
