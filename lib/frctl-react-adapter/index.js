const ProxyAdapter = require('./proxyAdapter.js');
const nunjucksAdapter = require('@frctl/nunjucks')({
  filters: {
    jsonify: d => JSON.stringify(d, null, '  '),
  },
  paths: [
    'src/components',
  ]
});

module.exports = function proxyAdapter(engineName, instance) {
  return {
    register(source, app) {
      const adapter = nunjucksAdapter.register(source, app);
      return new ProxyAdapter(engineName, instance, source, app, adapter);
    }
  };
};
