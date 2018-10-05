const getLatestVersion = require('./get-latest-version');

test('getLatestVersion', () => {
  let latestVersion = getLatestVersion.execute([]);
  expect(latestVersion).toBe(null);

  latestVersion = getLatestVersion.execute(['1.1.1']);
  expect(latestVersion).toBe('1.1.1');

  latestVersion = getLatestVersion.execute(['1.1.1', '3.3.3', '2.2.2']);
  expect(latestVersion).toBe('3.3.3');
});
