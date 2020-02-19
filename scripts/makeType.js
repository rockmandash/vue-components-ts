const fs = require('fs-extra');
const path = require('path');
const { allUtilIndexFilePaths, getParentFolderName } = require('./utils');
const paths = require('./paths');

const typeFileData =
  `import Vue from 'vue';` +
  '\n' +
  allUtilIndexFilePaths
    .map(utilIndexFilePath => {
      const utilName = getParentFolderName(utilIndexFilePath);
      return `export declare const ${utilName}: Vue;`;
    })
    .join('\n');

fs.writeFileSync(
  path.resolve(paths.distFolder, './main.common.d.ts'),
  typeFileData
);
