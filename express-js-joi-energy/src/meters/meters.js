const meters = (data) => ({
  addMeter: (accountId, newMeter) => {
    if (!data[accountId]) data[accountId] = [newMeter];
    else data[accountId] = [...data[accountId], newMeter];
    return data[accountId];
  },
  getAllMeter: (accountId) => {
    if (!data[accountId]) return [];
    return data[accountId];
  },
  removeMeter: (accountId, meterId) => {
    if (!data[accountId]) return;
    const foundIndex = data[accountId].findIndex((meter) => meter === meterId);
    if (foundIndex !== -1) {
      data[accountId].splice(foundIndex, 1);
    }
  },
});

module.exports = { meters };
