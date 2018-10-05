const jsonifyTree = require('./jsonify-tree');

test('jsonifyTree root', () => {
  const tree = { name: 'package-name-0', version: '0' };
  const jsonifiedTree = jsonifyTree.execute(tree);
  expect(jsonifiedTree).toBe('{"name":"package-name-0","version":"0"}');
});

test('jsonifyTree 2 dependencies', () => {
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
  const jsonifiedTree = jsonifyTree.execute(tree);
  expect(jsonifiedTree).toBe('{"name":"package-name-0","version":"0","dependencies":[{"name":"package-name-1.1","version":"1.1","dependencies":[]},{"name":"package-name-1.2","version":"1.2","dependencies":[]}]}');
});

test('jsonifyTree regular tree', () => {
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
  const jsonifiedTree = jsonifyTree.execute(tree);
  expect(jsonifiedTree).toBe('{"name":"package-name-0","version":"0","dependencies":[{"name":"package-name-1.1","version":"1.1","dependencies":[{"name":"package-name-2.1","version":"2.1","dependencies":[]}]},{"name":"package-name-1.2","version":"1.2","dependencies":[]}]}');
});
