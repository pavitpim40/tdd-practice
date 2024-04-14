const accounts = (data) => ({
  addAccount: (account) => {
    if (data[account]) throw new Error('unique violation');
    data[account] = account;
  },
});

module.exports = { accounts };
