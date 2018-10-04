module.exports = {
  execute: (date, timeAndVersions) => {
    const realTimeAndVersions = timeAndVersions.concat();
    realTimeAndVersions.sort((timeAndVersion1, timeAndVersion2) => timeAndVersion1.time.localeCompare(timeAndVersion2.time));
    const index = realTimeAndVersions.findIndex(timeAndVersion => timeAndVersion.time > date ? true : false);

    return realTimeAndVersions[index - 1].version;
  },
};
