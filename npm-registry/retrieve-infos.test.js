const callRegistry = require('./call-registry');
const retrieveInfos = require('./retrieve-infos');

jest.mock('./call-registry');

test('retrieveInfos no dependencies', async () => {
  callRegistry.execute.mockResolvedValue({
    versions: {
      '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
      '1.2.3': { dependencies: {} },
      '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
    },
  });
  const infos = await retrieveInfos.execute('package-name', '1.2.3', false);
  expect(infos).toEqual({
    name: 'package-name',
    version: '1.2.3',
    bestVersion: '1.2.3',
    dependencies: [],
  });
});

test('retrieveInfos with dependencies', async () => {
  callRegistry.execute
    .mockResolvedValueOnce({
      versions: {
        '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
        '1.2.3': { dependencies: { 'sub-package-name-221': '2.2.1' } },
        '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
      },
    }).mockResolvedValueOnce({
      versions: {
        '2.0.1': { dependencies: {} },
        '2.1.1': { dependencies: {} },
        '2.2.1': { dependencies: {} },
      },
    });

  const infos = await retrieveInfos.execute('package-name', '1.2.2', false);
  expect(infos).toEqual(
    {
      name: 'package-name',
      version: '1.2.2',
      bestVersion: '1.2.2',
      dependencies: [
        {
          name: 'sub-package-name-211',
          version: '2.1.1',
          bestVersion: '2.1.1',
          dependencies: [],
        },
      ],
    }
  );
});

test('retrieveInfos with dev dependencies', async () => {
  callRegistry.execute
    .mockResolvedValueOnce({
      versions: {
        '1.2.2': { devDependencies: { 'sub-package-name-211': '2.1.1' } },
        '1.2.3': { devDependencies: { 'sub-package-name-221': '2.2.1' } },
        '1.3.4': { devDependencies: { 'sub-package-name-231': '2.3.1' } },
      },
    }).mockResolvedValueOnce({
      versions: {
        '2.0.1': { devDependencies: {} },
        '2.1.1': { devDependencies: {} },
        '2.2.1': { devDependencies: {} },
      },
    });

  const infos = await retrieveInfos.execute('package-name', '1.2.2', true);
  expect(infos).toEqual(
    {
      name: 'package-name',
      version: '1.2.2',
      bestVersion: '1.2.2',
      dependencies: [
        {
          name: 'sub-package-name-211',
          version: '2.1.1',
          bestVersion: '2.1.1',
          dependencies: [],
        },
      ],
    }
  );
});

test('retrieveInfos with minor version', async () => {
  callRegistry.execute
    .mockResolvedValueOnce({
      versions: {
        '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
        '1.2.3': { dependencies: { 'sub-package-name-221': '2.2.1' } },
        '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
      },
    }).mockResolvedValueOnce({
      versions: {
        '2.0.1': { dependencies: {} },
        '2.1.1': { dependencies: {} },
        '2.2.1': { dependencies: {} },
      },
    });

  const infos = await retrieveInfos.execute('package-name', '~1.2.2', false);
  expect(infos).toEqual(
    {
      name: 'package-name',
      version: '~1.2.2',
      bestVersion: '1.2.3',
      dependencies: [
        {
          name: 'sub-package-name-221',
          version: '2.2.1',
          bestVersion: '2.2.1',
          dependencies: [],
        },
      ],
    }
  );
});

test('retrieveInfos with major version', async () => {
  callRegistry.execute
    .mockResolvedValueOnce({
      versions: {
        '1.2.2': { dependencies: { 'sub-package-name-211': '2.1.1' } },
        '1.2.3': { dependencies: { 'sub-package-name-221': '2.2.1' } },
        '1.3.4': { dependencies: { 'sub-package-name-231': '2.3.1' } },
      },
    }).mockResolvedValueOnce({
      versions: {
        '2.0.1': { dependencies: {} },
        '2.1.1': { dependencies: {} },
        '2.2.1': { dependencies: {} },
        '2.3.1': { dependencies: {} },
      },
    });

  const infos = await retrieveInfos.execute('package-name', '^1.2.2', false);
  expect(infos).toEqual(
    {
      name: 'package-name',
      version: '^1.2.2',
      bestVersion: '1.3.4',
      dependencies: [
        {
          name: 'sub-package-name-231',
          version: '2.3.1',
          bestVersion: '2.3.1',
          dependencies: [],
        },
      ],
    }
  );
});
