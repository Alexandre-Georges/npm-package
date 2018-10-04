const semver = require('semver');

module.exports = {
  execute: (version, comparator) => semver.satisfies(version, comparator),
};
