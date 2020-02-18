const fs = require('fs-extra');
const { allUtilIndexFilePaths, getParentFolderName } = require('./utils');
const paths = require('./paths');

fs.removeSync(paths.rootIndexFilePath);

const rootIndexFileData = allUtilIndexFilePaths
  .map(utilIndexFilePath => {
    const utilName = getParentFolderName(utilIndexFilePath);
    const fromPath = utilIndexFilePath
      .replace(paths.srcFolder, '.')
      .replace('/index.vue', '');
    return `export { ${utilName} } from '${fromPath}';`;
  })
  .join('\n');

fs.writeFileSync(paths.rootIndexFilePath, rootIndexFileData);
