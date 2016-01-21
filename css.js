import fs from 'fs';

import postcss from 'postcss';
import csswring from 'csswring';
import nested from 'postcss-nested';
import imports from 'postcss-import';
import vars from 'postcss-simple-vars';
import mixin from 'postcss-sassy-mixins';
import autoprefixer from './autoprefixer';
import extend from 'postcss-simple-extend';

const inject = `(function(css){
  var head = document.getElementsByTagName('head')[0];
  var cssNodeText = document.createTextNode(css);
  var style = document.createElement('style');

  style.type = 'text/css';
  style.appendChild(cssNodeText);
  head.appendChild(style);
})`;

function escape(source) {
  return source
    .replace(/(["\\])/g, '\\$1')
    .replace(/(['\\])/g, '\\$1')
    .replace(/[\f]/g, "\\f")
    .replace(/[\b]/g, "\\b")
    .replace(/[\n]/g, "\\n")
    .replace(/[\t]/g, "\\t")
    .replace(/[\r]/g, "\\r")
    .replace(/[\u2028]/g, "\\u2028")
    .replace(/[\u2029]/g, "\\u2029");
}

function process(load) {
  let sourceFile = load.address.replace('file://', '');
  let css = fs.readFileSync(sourceFile, { encoding: 'utf8' });

  return postcss([ imports, mixin, extend, vars, nested, autoprefixer, csswring() ]).process(css, { from: sourceFile });
}

export function fetch() {
  return '';
};

export function bundle(loads) {
  return process(loads[0])
    .then((result) => `${inject}('${escape(result.css)}');`)
    .catch((error) => console.error(error));
};
