const path = require('path');

const paths = {
  srcFolder: path.resolve(__dirname, '../src'),
  distFolder: path.resolve(__dirname, '../dist'),
  rootIndexFilePath: path.resolve(__dirname, '../src/main.ts')
};

module.exports = paths;
