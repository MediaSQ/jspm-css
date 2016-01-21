import fs from 'fs';

import postcss from 'postcss';
import nested from 'postcss-nested';
import imports from 'postcss-import';
import vars from 'postcss-simple-vars';
import mixin from 'postcss-sassy-mixins';
import autoprefixer from './autoprefixer';
import extend from 'postcss-simple-extend';

function process(load) {
  let sourceFile = load.address.replace('file://', '');
  let css = fs.readFileSync(sourceFile, { encoding: 'utf8' });

  return postcss([ imports, mixin, extend, vars, nested, autoprefixer ])
    .process(css, { from: sourceFile })
    .then(function (result) {
      console.log(result.css);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export function fetch() {
  return '';
};

export function bundle(loads) {
  return new Promise((resolve, reject) => {
    return Promise.all(loads.map(process));
  });
};
