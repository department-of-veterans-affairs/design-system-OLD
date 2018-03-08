const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const glob = require('glob');
const fs = require('fs');
const babel = require("babel-core");
const recast = require('recast');
const path = require('path');
const colors = require('colors');

console.log('Starting build'.blue);
console.log('Cleaing old build'.white);
rimraf.sync('./dist/jean-pants');
mkdirp.sync('./dist/jean-pants');

function flattenRequires(bufferString) {
  return new Buffer(recast.print(recast.visit(recast.parse(bufferString), {
    visitCallExpression: function(path) {
      var expr = path.node
      if (expr.callee.name == 'require') {
        this.traverse(path)
        if (expr.arguments.length && expr.arguments[0].value.charAt(0) == '.') {
          var arg = expr.arguments[0]
          expr.arguments[0] = arg.raw.charAt(0) + './' + arg.value.split('/').pop() + arg.raw.charAt(0)
        }
      }
      else {
        return false
      }
    }
  })).code);
}

const fileNames = [].concat.apply([], [
  glob.sync('./src/components/**/*.jsx', { ignore: './**/*.unit.spec.jsx' }),
  glob.sync('./src/helpers/*.js')
]);

fileNames.forEach(fileName => {
  const fileBuffer = fs.readFileSync(fileName);
  const babelTransformedBuffer = babel
    .transform(fileBuffer, { extends: './.babelrc' })
    .code;
  const requireFlattenedBuffer = flattenRequires(babelTransformedBuffer.toString());
  const newFileName = `${path.parse(fileName).name}.js`;

  fs.writeFileSync(`./dist/jean-pants/${newFileName}`, requireFlattenedBuffer);
  console.log(`${newFileName} built`.cyan);
});

console.log('Build complete'.blue);
