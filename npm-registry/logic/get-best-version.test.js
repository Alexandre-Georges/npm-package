const getBestVersion = require('./get-best-version');

test('getBestVersion', () => {
  let version = getBestVersion.execute(
    [],
    '1.1.2',
  );
  expect(version).toBe(null);

  version = getBestVersion.execute(
    ['1.1.1', '1.1.2', '1.2.1', '1.2.2', '2.1.1'],
    '1.1.2',
  );
  expect(version).toBe('1.1.2');

  version = getBestVersion.execute(
    ['1.1.1', '1.1.2', '1.2.1', '1.2.2', '2.1.1'],
    '1.2.1',
  );
  expect(version).toBe('1.2.1');

  version = getBestVersion.execute(
    ['1.1.1', '1.1.2', '1.2.1', '1.2.2', '2.1.1'],
    '~1.1.1',
  );
  expect(version).toBe('1.1.2');

  version = getBestVersion.execute(
    ['1.1.1', '1.1.2', '1.2.1', '1.2.2', '2.1.1'],
    '^1.1.1',
  );
  expect(version).toBe('1.2.2');

  version = getBestVersion.execute(
    ['1.1.1', '1.1.2', '1.2.1', '1.2.2', '2.1.1'],
    '<1.1.2',
  );
  expect(version).toBe('1.1.1');
});
