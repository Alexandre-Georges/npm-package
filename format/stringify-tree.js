const stringifyTree = (node, depth = 0) => {
  let result = `${depth === 0 ? '' : '\n'}`;
  result += `${'  '.repeat(depth)}${node.name}@${node.version} (${node.bestVersion})`;
  for (const childIndex in node.dependencies) {
    result += stringifyTree(node.dependencies[childIndex], depth + 1);
  }

  return result;
};

module.exports = {
  execute: stringifyTree,
};