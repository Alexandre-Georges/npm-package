const retrieveDependencies = require('../npm-registry/retrieve-dependencies');

const createNode = require('./create-node');

const buildTree = async (name, version) => {
  const node = createNode.execute(name, version);
  const dependencies = await retrieveDependencies.execute(name, version);

  for (const dependencyIndex in dependencies) {
    const dependency = dependencies[dependencyIndex];
    const dependencyNode = await buildTree(dependency.name, dependency.version);
    node.dependencies.push(dependencyNode);
  }

  return node;
};

module.exports = {
  execute: buildTree,
};
