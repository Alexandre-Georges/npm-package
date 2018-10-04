const versionComparator = require('./version-comparator');

module.exports = {
  execute: versions => {
    const compatibleVersions = versions.concat().sort(versionComparator.execute);
    return compatibleVersions[compatibleVersions.length - 1];
  },
};