module.exports = {
  execute: packageInfo => {
    const versionsAndTimes = [];
    for (const version in packageInfo.time) {
      if (version !== 'modified' && version !== 'created') {
        versionsAndTimes.push({ version, time: packageInfo.time[version] });
      }
    }
    return versionsAndTimes;
  },
};