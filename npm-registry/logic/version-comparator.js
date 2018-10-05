const semver = require('semver');

module.exports = {
  execute: (version1, version2) => semver.lt(version1, version2) ? -1 : 1,
};
