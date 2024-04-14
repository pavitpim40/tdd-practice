const { meters } = require('../meters/meters.data');
const accountsData = {
  USER0: 'Sarah',
  USER1: 'Peter',
  USER2: 'Charlie',
};

const accountMetersMap = {
  [accountsData.USER0]: [meters.METER0],
  [accountsData.USER1]: [meters.METER1],
  [accountsData.USER2]: [meters.METER2],
};

module.exports = { accountsData, accountMetersMap };
