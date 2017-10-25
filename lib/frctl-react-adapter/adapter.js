require('babel-register');
const babel = require('babel-core');
const debug = require('debug')('fain:frctl-react-adapter');
const Adapter = require('@frctl/fractal').Adapter;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const vm = require('vm');
const MemoryFs = require('memory-fs');
const webpack = require('webpack');

const { cleanFilepath } = require('./utils');

let componentStyle = '';
const babelOptions = {
  babelrc: false,
  plugins: [],
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-2'),
  ]
};

function webpackCompile() {
  const compiler = webpack({
    output: {
      filename: 'bundle.js',
      path: '/'
    }
  })

  compiler.outputFileSystem = new MemoryFs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err)

      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(new Error(stats.toString({
          errorDetails: true,
          warnings: true
        })))
      }

      const result = compiler.outputFileSystem.data['bundle.js'].toString()
      resolve(result)
    })
  })
}

function compile(code) {
  // after first compilation, require will be hooked to use babel
  // because it is shared with the vm
  const result = babel.transform(code, babelOptions);
  return result.code;
}

function getSandbox() {
  return {
    exports: {},
    process: { env: { BABEL_DISABLE_CACHE: 1, NODE_ENV: 'production' } },
    require,
    window: { navigator: { userAgent: 'Node' } }
  };
}

function clearRequireCache() {
  debug(Object.keys(require.cache).filter(id => !/node_modules/.test(id)));
  Object.keys(require.cache)
    .filter(id => /packages\/fain\/(?!node_modules)/.test(id))
    .forEach(id => delete require.cache[id]);
}

function compileComponent(tplPath, tplCode) {
  clearRequireCache();
  debug(`COMPILE: ${cleanFilepath(tplPath)}`);
  const sandbox = getSandbox();
  vm.runInNewContext(`${compile(tplCode)}`, sandbox);
  const Component = sandbox.exports.default;
  return Component;
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
    debug(`RENDERING: ${cleanFilepath(tplPath)}`);

    try {
      const Component = compileComponent(tplPath, tplCode);
      const { engineName, fractal, instance, source } = this;
      const props = Object.assign({},
        { engineName, fractal, instance, source, filePath: tplPath, meta },
        tplContext
      );

      const element = React.createElement(Component, props);
      const html = ReactDOMServer.renderToStaticMarkup(element);
      return Promise.resolve(html);
    } catch (error) {
      debug(error);
      return Promise.reject(error.message);
    }
  }
}

module.exports = ReactAdapter;
