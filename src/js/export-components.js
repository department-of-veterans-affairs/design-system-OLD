const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const recursiveReadDir = require('recursive-readdir');
const babel = require("babel-core");


function maybeMakeDirectories(directories = []) {
  directories.forEach((directory) => {
    if(!fs.existsSync(directory)) {
      mkdirp.sync(directory);
      console.log(`${directory} directory created`);
    }
  });
}

function exportFiles(sourceFiles = [], destinationDirectory = '/dist') {
  sourceFiles.forEach((fileName) => {
    babel.transformFile(fileName, (err, result) => {
      const componentName = fileName.slice(fileName.lastIndexOf('/') + 1, fileName.indexOf('.'));
      const newFileName = `${destinationDirectory}/${componentName}.js`;

      fs.writeFile(newFileName, result.code);
    });
  });
}

function ignoredFilesPredicate(file, stats) {
  return !stats.isDirectory() && // don't ignore directories
    (file.includes('.spec.jsx') || // ignore test files
    !file.includes('.jsx')) // don't ignore .jsx files
}

function getComponentsPaths(componentsDirectory) {
  return recursiveReadDir(componentsDirectory, [ignoredFilesPredicate]);
}

function transformJSFiles(filePaths = []) {
  return Promise.resolve(filePaths.map((filePath) =>
    ({
      name: path.basename(filePath).slice(0, -1),
      code: babel.transformFileSync(filePath).code
    })
  ));
}

function exportFiles(destinationDirectory, transformedCodeObjects) {
  transformedCodeObjects.forEach((file) =>
    fs.writeFileSync(`${destinationDirectory}/${file.name}`, file.code)
  );

  console.log(`\x1b[36m${transformedCodeObjects.length} files written`);
}

function main() {
  const appRootPath = path.resolve();
  const distComponentsPath = `${appRootPath}/dist/js/components`;

  maybeMakeDirectories([distComponentsPath]);

  getComponentsPaths(`${appRootPath}/src/components`)
    .then(transformJSFiles)
    .then((transformedCodeObjects) =>
      exportFiles(distComponentsPath, transformedCodeObjects));
}

main();
