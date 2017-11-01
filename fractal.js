'use strict';
const pkg = require('./package.json');
const path = require('path');
const fs = require('fs');
const fractal = require('@frctl/fractal').create();

const context = {
  'package': {
    name: pkg.name,
    version: pkg.version,
  },
  uswds: {
    path: '../../dist',
  },
};

function generateProps(entity) {
  const viewPath = entity.viewPath;
  if (entity.isComponent) {
    const srcPath = entity.variants().items()[0].context.componentSourcePath;
    if (srcPath) {
      const fullPath = path.join(path.dirname(entity.viewPath), srcPath);
      const reactDocs = require('react-docgen');

      return reactDocs.parse(fs.readFileSync(fullPath)).props;
    }

    return {};
  }

  return {};
}

fractal.set('project.title', 'Vets.gov Design Standards');

const components = fractal.components;
components.set('ext', '.njk');
components.set('path', 'src/components');
components.set('default.preview', '@uswds');
components.set('default.context', context);

const vetsAdapter = require('./lib/vets-adapter')({
  filters: {
    jsonify: d => JSON.stringify(d, null, '  '),
  },
  paths: [
    'src/components',
  ]
});

fractal.components.engine(vetsAdapter);

const docs = fractal.docs;
docs.set('path', 'docs');

const web = fractal.web;

const theme = require('@frctl/mandelbrot')({
  lang: 'en-US',
  skin: 'white',
  // display context data in YAML
  format: 'yaml',
  // which panels to show
  panels: [
    'html',
    'notes',
    'view',
    'context',
    'resources',
    'info',
    'props'
  ],
});

theme.addLoadPath(__dirname + '/theme-overrides');

theme.on('init', (env, app) => {
  env.engine.addFilter('generateProps', generateProps);
});

web.theme(theme);

web.set('static.path', 'dist');
web.set('static.mount', 'dist');
// output files to /build
web.set('builder.dest', 'build');
web.set('server.sync', true);

module.exports = fractal;
