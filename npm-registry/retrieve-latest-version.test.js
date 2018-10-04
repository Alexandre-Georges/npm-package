const callRegistry = require('./call-registry');
const retrieveDependencies = require('./retrieve-dependencies');

jest.mock('./call-registry');

test('retrieveDependencies no dependencies', async () => {
  callRegistry.execute.mockResolvedValue({
    versions: {
      '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
      '1.2.3': { dependencies: {} },
      '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
    },
  });
  const dependencies = await retrieveDependencies.execute('package-name', '1.2.3');
  expect(dependencies).toEqual([]);
});

test('retrieveDependencies with dependencies', async () => {
  callRegistry.execute.mockResolvedValue({
    versions: {
      '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
      '1.2.3': { dependencies: { 'sub-package-name-221': '2.2.1' } },
      '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
    },
  });

  const dependencies = await retrieveDependencies.execute('package-name', '1.2.2');
  expect(dependencies).toEqual([
    { name: 'sub-package-name-211', version: '2.1.1' },
  ]);
});

test('retrieveDependencies with minor version', async () => {
  callRegistry.execute.mockResolvedValue({
    versions: {
      '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
      '1.2.3': { dependencies: { 'sub-package-name-221': '2.2.1' } },
      '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
    },
  });

  const dependencies = await retrieveDependencies.execute('package-name', '~1.2.2');
  expect(dependencies).toEqual([
    { name: 'sub-package-name-221', version: '2.2.1' },
  ]);
});

test('retrieveDependencies with major version', async () => {
  callRegistry.execute.mockResolvedValue({
    versions: {
      '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
      '1.2.3': { dependencies: { 'sub-package-name-221': '2.2.1' } },
      '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
    },
  });

  const dependencies = await retrieveDependencies.execute('package-name', '^1.2.2');
  expect(dependencies).toEqual([
    { name: 'sub-package-name-231', version: '2.3.1' },
  ]);
});
