import fs from 'fs';

import { transform } from './transformer';

const Processor = function(loads, opts) {
  this.loads = loads;
  this.loaderOptions = opts;
}

Processor.prototype.process = function() {
  return Promise.all(this.loads.map((load) => {
    const sourceFile = load.address.replace('file://', '');
    const css = fs.readFileSync(sourceFile, { encoding: 'utf8' });

    return transform(css, sourceFile)
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
