const callRegistry = require('./call-registry');
const getVersions = require('./api/get-versions');
const getBestVersion = require('./logic/get-best-version');
const getVersionInfos = require('./api/get-version-infos');

module.exports = {
  execute: async (name, version) => {
    const packageInfo = await callRegistry.execute(name);
    const versions = getVersions.execute(packageInfo);
    const bestVersion = getBestVersion.execute(versions, version);
    const versionInfo = getVersionInfos.execute(bestVersion, packageInfo);

    const dependencies = [];

    for (const dependency in versionInfo.dependencies) {
      dependencies.push({
        name: dependency,
        version: versionInfo.dependencies[dependency],
      });
    }
    return dependencies;
  },
};