const path = require("path");
const glob = require("glob");
const paths = require("./paths");

const getParentFolderName = filePath => path.basename(path.dirname(filePath));

const allUtilIndexFilePaths = glob.sync(
  path.resolve(paths.srcFolder, "./**/index.vue")
);

module.exports = {
  getParentFolderName,
  allUtilIndexFilePaths
};
