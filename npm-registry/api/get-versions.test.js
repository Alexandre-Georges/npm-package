const getVersions = require('./get-versions');

test('getVersions', () => {
  let versions = getVersions.execute({ versions: {} });
  expect(versions).toEqual([]);

  versions = getVersions.execute({ versions: { '1.2.3': {} } });
  expect(versions).toEqual(['1.2.3']);

  versions = getVersions.execute({ versions: { '1.2.3': {}, '2.3.4': {} } });
  expect(versions).toEqual(['1.2.3', '2.3.4']);
});
