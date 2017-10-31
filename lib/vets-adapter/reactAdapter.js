/*
 * Adapted from https://github.com/guzart/fain/tree/v0.9.0/packages/fain-src/lib/frctl-react-adapter
 * License: https://github.com/guzart/fain/blob/v0.9.0/LICENSE
 */

require('babel-register');
const Adapter = require('@frctl/fractal').Adapter;
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const babelOptions = {
  babelrc: false,
  plugins: [],
  presets: [
    [
      'babel-preset-env',
      {
        targets: {
          node: "6.10"
        }
      }
    ],
    'babel-preset-react'
  ]
};

class ReactAdapter extends Adapter {
  constructor(engineName, instance, source, app) {
    super(instance, source);
    this.fractal = app;
    this.engineName = engineName;
    this.instance = instance;
    this.source = source;
    this.cache = {};
  }

  render(tplPath, tplCode, tplContext, meta) {
    try {
      const Component = require(tplPath).default;
      const { engineName, fractal, instance, source } = this;
      const props = Object.assign({},
        { engineName, fractal, instance, source, filePath: tplPath, meta },
        tplContext
      );

      const element = React.createElement(Component, props);
      const html = ReactDOMServer.renderToStaticMarkup(element);
      return Promise.resolve(html);
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
}

module.exports = ReactAdapter;
