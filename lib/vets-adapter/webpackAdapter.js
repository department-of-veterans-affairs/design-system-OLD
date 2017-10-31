/*
 * This is a WIP for running a live webpack bundle in the design system, in order
 * to better show interactivity
 */
const Adapter = require('@frctl/fractal').Adapter;
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

function entryTemplate(props) {
  return `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Modal from 'babel-loader!./modals.react.njk';

    const props = ${JSON.stringify(props)};
    ReactDOM.render(<Modal {...props}/>, document.getElementById('reactMain'));
  `;
}

function webpackCompile(tplCode, props) {
  const { filePath } = props;
  const parsedPath = path.parse(filePath);
  fs.writeFileSync(`${filePath}.jsx`, entryTemplate(props));
  const compiler = webpack({
    entry: `${filePath}.jsx`,
    output: {
      filename: `dist/output/${parsedPath.base}.bundle.js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-2'],
              // Speed up compilation.
              cacheDirectory: '.babelcache'

              // Also see .babelrc
            }
          }
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-2'],
              // Speed up compilation.
              cacheDirectory: '.babelcache'

              // Also see .babelrc
            }
          }
        }
      ]
    }
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);

      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(new Error(stats.toString({
          errorDetails: true,
          warnings: true
        })));
      }

      resolve();
    })
  })
}

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
      const { engineName, fractal, instance, source } = this;
      const props = Object.assign({},
        // { engineName, fractal, source, filePath: tplPath, meta },
        { filePath: tplPath },
        tplContext
      );

      return webpackCompile(tplCode, props)
        .then(() => {
          return `<div id="reactMain"></div><script src="../../dist/output/modals.react.njk.bundle.js"></script>`;
        });
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
}

module.exports = ReactAdapter;
