const callRegistry = require('./call-registry');
const getVersionsAndTimes = require('./api/get-versions-and-times');
const getVersionForDate = require('./logic/get-version-for-date');

module.exports = {
  execute: async (name, date) => {
    const packageInfo = await callRegistry.execute(name);
    const versionsAndTimes = getVersionsAndTimes.execute(packageInfo);
    return getVersionForDate.execute(date, versionsAndTimes);
  },
};