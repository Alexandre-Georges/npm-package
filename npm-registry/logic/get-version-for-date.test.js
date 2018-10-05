const getVersionForDate = require('./get-version-for-date');

test('getVersionForDate', () => {
  const times = [
    { version: '2.2.2', time: '2017-05-01T00:00:00.000Z' },
    { version: '3.3.3', time: '2018-05-01T00:00:00.000Z' },
    { version: '1.1.1', time: '2016-05-01T00:00:00.000Z' },
  ];

  let version = getVersionForDate.execute('2015-09-01', times);
  expect(version).toBe(null);

  version = getVersionForDate.execute('2016-09-01', times);
  expect(version).toBe('1.1.1');

  version = getVersionForDate.execute('2017-06-01', times);
  expect(version).toBe('2.2.2');

  version = getVersionForDate.execute('2018-06-01', times);
  expect(version).toBe('3.3.3');
});
