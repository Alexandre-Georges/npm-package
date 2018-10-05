const callRegistry = require('./call-registry');
const retrieveVersionForDate = require('./retrieve-version-for-date');

jest.mock('./call-registry');

test('retrieveVersionForDate', async () => {
  callRegistry.execute.mockResolvedValue({
    time: {
      '1.0.0': '2016-01-01T00:00:00.000Z',
      '2.0.0': '2017-01-01T00:00:00.000Z',
      '3.0.0': '2018-01-01T00:00:00.000Z',
    },
  });
  let version = await retrieveVersionForDate.execute('package-name', '2016-01-02');
  expect(version).toBe('1.0.0');

  version = await retrieveVersionForDate.execute('package-name', '2017-01-02');
  expect(version).toBe('2.0.0');

  version = await retrieveVersionForDate.execute('package-name', '2018-01-02');
  expect(version).toBe('3.0.0');
});
