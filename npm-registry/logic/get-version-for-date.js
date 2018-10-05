const stringComparator = require('./string-comparator');

module.exports = {
  execute: (date, timeAndVersions) => {
    const realTimeAndVersions = timeAndVersions.concat();
    realTimeAndVersions.sort((timeAndVersion1, timeAndVersion2) => stringComparator.execute(timeAndVersion1.time, timeAndVersion2.time));
    const index = realTimeAndVersions.reduce((bestIndex, timeAndVersion, currentIndex) => timeAndVersion.time < date ? currentIndex : bestIndex, -1);
    return index !== -1 ? realTimeAndVersions[index].version : null;
  },
};
