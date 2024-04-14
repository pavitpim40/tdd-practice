const readings = (data) => ({
  getReadings: (meterId) => data[meterId] || [],
  setReadings: (meterId, readings) => {
    const currentReadings = data[meterId];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
  getReadingsInTime(meterId, start, end) {
    if (!data[meterId]) return [];
    return data[meterId].filter((reading) => reading.time >= start && reading.time <= end);
  },
});

module.exports = { readings };
