import postcss from 'postcss';
import nested from 'postcss-nested';
import imports from 'postcss-import';
import vars from 'postcss-simple-vars';
import mixin from 'postcss-sassy-mixins';
import media from 'postcss-custom-media';
import hover from 'postcss-hover-prefix';
import calc from 'postcss-calc';

import autoprefixer from './autoprefixer';

export function transform(css, sourceFile) {
  return postcss([
    imports,
    mixin,
    nested,
    vars,
    media,
    calc,
    autoprefixer
  ]).use(hover('u-hoverable'))
    .process(css, { from: sourceFile });
};
