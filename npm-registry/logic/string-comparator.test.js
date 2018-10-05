const stringComparator = require('./string-comparator');

test('stringComparator', () => {
  expect(stringComparator.execute('abc', 'bbc')).toBe(-1);
  expect(stringComparator.execute('abc', 'abc')).toBe(1);
  expect(stringComparator.execute('bbc', 'abc')).toBe(1);
});
