import fs from 'fs';

import postcss from 'postcss';
import nested from 'postcss-nested';
import imports from 'postcss-import';
import vars from 'postcss-simple-vars';
import mixin from 'postcss-sassy-mixins';
import media from 'postcss-custom-media';
import autoprefixer from './autoprefixer';

const Processor = function(loads, opts) {
  this.loads = loads;
  this.loaderOptions = opts;
}

Processor.prototype.process = function() {
  return Promise.all(this.loads.map((load) => {
    const sourceFile = load.address.replace('file://', '');
    const css = fs.readFileSync(sourceFile, { encoding: 'utf8' });

    return postcss([imports, mixin, nested, vars, media, autoprefixer])
      .process(css, { from: sourceFile })
      .then(this.write.bind(this))
      .catch((error) => console.error(error));
  }));
}

Processor.prototype.write = function(result) {
  const css = result.css;
  const dir = this.loaderOptions.cssDirectory;
  const fileName = this.loaderOptions.cssFileName;

  fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/${fileName}`, css);
};

export default Processor;
