const versionComparator = require('./version-comparator');

module.exports = {
  execute: versions => {
    const orderedVersions = versions.concat().sort(versionComparator.execute);
    return orderedVersions.length > 0 ? orderedVersions[orderedVersions.length - 1] : null;
  },
};