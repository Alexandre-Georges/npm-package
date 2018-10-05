const isCompatibleVersion = require('./is-compatible-version');
const versionComparator = require('./version-comparator');

module.exports = {
  execute: (versions, requestedVersion) => {
    const compatibleVersions = versions.filter((version) => isCompatibleVersion.execute(version, requestedVersion));
    compatibleVersions.sort(versionComparator.execute);
    return compatibleVersions.length > 0 ? compatibleVersions[compatibleVersions.length - 1] : null;
  },
};
