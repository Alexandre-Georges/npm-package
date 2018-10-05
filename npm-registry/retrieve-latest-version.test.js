const callRegistry = require('./call-registry');
const retrieveLatestVersion = require('./retrieve-latest-version');

jest.mock('./call-registry');

test('retrieveLatestVersion no dependencies', async () => {
  callRegistry.execute.mockResolvedValue({
    versions: {
      '1.2.2': {},
      '1.3.4': {},
      '1.2.3': {},
    },
  });
  const latestVersion = await retrieveLatestVersion.execute('package-name');
  expect(latestVersion).toBe('1.3.4');
});
