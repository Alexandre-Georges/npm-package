const stringifyTree = require('./stringify-tree');

test('stringifyTree root', () => {
  const tree = { name: 'package-name-0', version: '0' };
  const stringifiedTree = stringifyTree.execute(tree);
  expect(stringifiedTree).toEqual('package-name-0@0');
});

test('stringifyTree 2 dependencies', () => {
  const tree = {
    name: 'package-name-0',
    version: '0',
    dependencies: [
      {
        name: 'package-name-1.1',
        version: '1.1',
        dependencies: [],
      },
      {
        name: 'package-name-1.2',
        version: '1.2',
        dependencies: [],
      },
    ],
  };
  const stringifiedTree = stringifyTree.execute(tree);
  expect(stringifiedTree).toEqual(
    `package-name-0@0
  package-name-1.1@1.1
  package-name-1.2@1.2`);
});

test('stringifyTree regular tree', () => {
  const tree = {
    name: 'package-name-0',
    version: '0',
    dependencies: [
      {
        name: 'package-name-1.1',
        version: '1.1',
        dependencies: [
          {
            name: 'package-name-2.1',
            version: '2.1',
            dependencies: [],
          }
        ],
      },
      {
        name: 'package-name-1.2',
        version: '1.2',
        dependencies: [],
      },
    ],
  };
  const stringifiedTree = stringifyTree.execute(tree);
  expect(stringifiedTree).toEqual(
    `package-name-0@0
  package-name-1.1@1.1
    package-name-2.1@2.1
  package-name-1.2@1.2`);
});
