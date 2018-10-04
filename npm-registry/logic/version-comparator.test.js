const isBetterVersion = require('./version-comparator');

test('isBetterVersion', () => {
  expect(isBetterVersion.execute('1.2.3', '1.2.3')).toBe(1);

  expect(isBetterVersion.execute('1.2.4', '1.2.3')).toBe(1);
  expect(isBetterVersion.execute('1.3.2', '1.2.3')).toBe(1);
  expect(isBetterVersion.execute('2.1.1', '1.2.3')).toBe(1);

  expect(isBetterVersion.execute('2.3.3', '2.3.4')).toBe(-1);
  expect(isBetterVersion.execute('2.2.4', '2.3.4')).toBe(-1);
  expect(isBetterVersion.execute('1.3.4', '2.3.4')).toBe(-1);
});
