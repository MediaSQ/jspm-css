import fs from 'fs';

import postcss from 'postcss';
import nested from 'postcss-nested';
import imports from 'postcss-import';
import vars from 'postcss-simple-vars';
import mixin from 'postcss-sassy-mixins';
import media from 'postcss-custom-media';
import autoprefixer from './autoprefixer';

function process(load) {
  let sourceFile = load.address.replace('file://', '');
  let css = fs.readFileSync(sourceFile, { encoding: 'utf8' });

  return postcss([
    imports,
    mixin,
    nested,
    vars,
    media,
    autoprefixer
  ]).process(css, { from: sourceFile });
}

function write(opts) {
  var loaderOptions = opts;

  return function(result) {
    let css = result.css;
    let dir = loaderOptions.cssDirectory;
    let fileName = loaderOptions.cssFileName;

    fs.mkdirSync(dir);
    fs.writeFileSync(dir + '/' + fileName, css);
  }
}

export function fetch() {
  return '';
};

export function bundle(loads, opts) {
  return process(loads[0])
    .then(write(opts))
    .catch((error) => console.error(error));
};
