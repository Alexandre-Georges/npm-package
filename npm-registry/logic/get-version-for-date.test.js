const getVersionForDate = require('./get-version-for-date');

test('getVersionForDate', () => {
  let times = [
    { version: '2.2.2', time: '2019-05-01T00:00:00.000Z' },
    { version: '1.1.1', time: '2018-05-01T00:00:00.000Z' },
  ];

  let version = getVersionForDate.execute('2018-06-01', times);
  expect(version).toBe('1.1.1');

});
