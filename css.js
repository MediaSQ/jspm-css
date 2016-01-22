import Processor from './src/processor';

export function fetch() {
  return '';
};

export function bundle(loads, opts) {
  const processor = new Processor(loads, opts);

  return processor.process().then(() => ''); // We have created separated files for each load,
                                             // so we don't need to add anything to the bundle.
};
