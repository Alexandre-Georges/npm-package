const semver = require('semver');

module.exports = {
  execute: (version1, version2) => {
    if (semver.lt(version1, version2)) {
      return -1;
    }
    return 1;
  },
};
