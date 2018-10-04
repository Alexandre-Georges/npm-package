const getVersionsAndTimes = require('./get-versions-and-times');

test('getVersionsAndTimes', () => {
  let versionsAndTimes = getVersionsAndTimes.execute({ time: {} });
  expect(versionsAndTimes).toEqual([]);

  versionsAndTimes = getVersionsAndTimes.execute({ time: {
    'created': '2018-01-01T00:00:00.000Z',
    'modified': '2018-01-01T00:00:00.000Z',
  } });
  expect(versionsAndTimes).toEqual([]);

  versionsAndTimes = getVersionsAndTimes.execute({ time: {
    '1.1.1': '2017-01-01T00:00:00.000Z',
  } });
  expect(versionsAndTimes).toEqual([
    { version: '1.1.1', time: '2017-01-01T00:00:00.000Z' },
  ]);

  versionsAndTimes = getVersionsAndTimes.execute({ time: {
    '1.1.1': '2017-01-01T00:00:00.000Z',
    '2.2.2': '2018-01-01T00:00:00.000Z',
  } });
  expect(versionsAndTimes).toEqual([
    { version: '1.1.1', time: '2017-01-01T00:00:00.000Z' },
    { version: '2.2.2', time: '2018-01-01T00:00:00.000Z' },
  ]);
});
