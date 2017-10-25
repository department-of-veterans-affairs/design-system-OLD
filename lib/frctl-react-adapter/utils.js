const path = require('path');

const cleanFilepath = (filepath) => path.relative(path.resolve(__dirname, '../../'), filepath);

module.exports = {
  cleanFilepath
};
