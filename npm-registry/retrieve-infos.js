const callRegistry = require('./call-registry');
const getVersions = require('./api/get-versions');
const getBestVersion = require('./logic/get-best-version');
const getVersionInfos = require('./api/get-version-infos');

const retrieveInfos = async (name, version) => {
  const packageInfo = await callRegistry.execute(name);
  const versions = getVersions.execute(packageInfo);
  const bestVersion = getBestVersion.execute(versions, version);
  const versionInfo = getVersionInfos.execute(bestVersion, packageInfo);

  const dependencies = [];

  for (const dependencyIndex in versionInfo.dependencies) {
    const dependency = await retrieveInfos(dependencyIndex, versionInfo.dependencies[dependencyIndex]);
    dependencies.push(dependency);
  }
  return { name, version, bestVersion, dependencies };
};

module.exports = {
  execute: retrieveInfos,
};