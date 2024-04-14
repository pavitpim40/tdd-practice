const { meters } = require('../meters/meters.data');
const accounts = {
  USER0: 'Sarah@mail.com',
  USER1: 'Peter@mail.com',
  USER2: 'Charlie@mail.com',
};
const accountsData = {
  [accounts.USER0]: { firstName: 'Sarah' },
  [accounts.USER1]: { firstName: 'Peter' },
  [accounts.USER2]: { firstName: 'Charlie' },
};

const accountMetersMap = {
  [accountsData.USER0]: [meters.METER0],
  [accountsData.USER1]: [meters.METER1],
  [accountsData.USER2]: [meters.METER2],
};

module.exports = { accountsData, accountMetersMap };
