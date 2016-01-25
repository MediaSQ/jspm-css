# sweetspot-front-jspm-css

Custom `jspm` plugin for loading CSS by applying some PostCSS transformations:

1. [postcss-import](https://github.com/postcss/postcss-import)
1. [postcss-sassy-mixins](https://github.com/andyjansson/postcss-sassy-mixins)
1. [postcss-nested](https://github.com/postcss/postcss-nested)
1. [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)
1. [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
1. [autoprefixer](https://github.com/postcss/autoprefixer)

## Installation

```
jspm install css=github:MediaSQ/sweetspot-front-jspm-css
```

## Use

```javascript
import 'styles.css!'

function foo() {
  console.log('bar');
}
```

## Autoprefixer

An Autoprefixer version is bundled within the plugin. `jspm` [has issues](https://github.com/jspm/npm/issues/52) when loading cross-package JSONs and Autoprefixer makes heavy using of this feature for loading its `caniuse` database.

The `autoprefixer.js` file is borrowed from the  [jspm-loader-css](https://github.com/geelen/jspm-loader-css) plugin.

## Known issues

Because of the `jspm` name collision policy, the CSS files cannot be placed within a `css/` folder. More info:

* https://github.com/systemjs/plugin-css/issues/34

***

&copy; MediaSQ
