const callRegistry = require('./call-registry');
const getVersions = require('./api/get-versions');
const getBestVersion = require('./logic/get-best-version');
const getVersionInfos = require('./api/get-version-infos');

const retrieveInfos = async (name, version, isDev) => {
  const packageInfo = await callRegistry.execute(name);
  const versions = getVersions.execute(packageInfo);
  const bestVersion = getBestVersion.execute(versions, version);
  const versionInfo = getVersionInfos.execute(bestVersion, packageInfo);

  const dependencies = [];

  const dependencyKey = isDev ? 'devDependencies' : 'dependencies';
  const versionDependencies = versionInfo[dependencyKey];

  for (const dependencyIndex in versionDependencies) {
    const dependency = await retrieveInfos(dependencyIndex, versionDependencies[dependencyIndex]);
    dependencies.push(dependency);
  }
  return { name, version, bestVersion, dependencies };
};

module.exports = {
  execute: retrieveInfos,
};