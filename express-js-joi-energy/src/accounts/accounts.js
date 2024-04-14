const accounts = (data) => ({
  addMeter: (account, newMeter) => {
    if (!data[account]) data[account] = [newMeter];
    else data[account] = [...data[account], newMeter];
    return data[account];
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

module.exports = { accounts };
