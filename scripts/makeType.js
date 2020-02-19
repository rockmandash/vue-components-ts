const fs = require('fs-extra');
const path = require('path');
const { allUtilIndexFilePaths, getParentFolderName } = require('./utils');
const paths = require('./paths');

const cneterTypeFileData = allUtilIndexFilePaths
  .map(utilIndexFilePath => {
    const utilName = getParentFolderName(utilIndexFilePath);
    return `export const ${utilName}: ExtendedVue<Vue, {}, {}, {}, {}>;`;
  })
  .join('\n');

const typeFileData = `
import Vue from 'vue';
import { ExtendedVue } from 'vue/types/vue';

declare module 'vue-components-ts' {
${cneterTypeFileData}
}
`;

fs.writeFileSync(
  path.resolve(paths.distFolder, './main.common.d.ts'),
  typeFileData
);
