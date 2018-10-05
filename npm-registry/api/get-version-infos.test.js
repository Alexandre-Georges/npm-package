const getVersionInfos = require('./get-version-infos');

test('getVersionInfos', () => {
  const version123 = {};

  let versionInfos = getVersionInfos.execute('1.2.3', { versions: {} });
  expect(versionInfos).toBe(undefined);

  versionInfos = getVersionInfos.execute('1.2.3', { versions: { '1.2.3': version123 } });
  expect(versionInfos).toBe(version123);

  versionInfos = getVersionInfos.execute('1.2.3', { versions: {
    '1.2.1': {},
    '1.2.2': {},
    '1.2.3': version123,
  } });
  expect(versionInfos).toBe(version123);
});
