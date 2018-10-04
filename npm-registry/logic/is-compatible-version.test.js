const isCompatibleVersion = require('./is-compatible-version');

test('isCompatibleVersion', () => {
  expect(isCompatibleVersion.execute('1.2.3', '1.2.2')).toBe(false);
  expect(isCompatibleVersion.execute('1.2.3', '1.2.3')).toBe(true);

  expect(isCompatibleVersion.execute('1.2.3', '2.x')).toBe(false);
  expect(isCompatibleVersion.execute('1.2.3', '1.x')).toBe(true);
});
