const callRegistry = require('./call-registry');
const getVersions = require('./api/get-versions');
const getLatestVersion = require('./logic/get-latest-version');

module.exports = {
  execute: async (name) => {
    const packageInfo = await callRegistry.execute(name);
    const versions = getVersions.execute(packageInfo);
    return getLatestVersion.execute(versions);
  },
};