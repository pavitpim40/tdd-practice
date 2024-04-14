const accounts = (data) => ({
  addAccount: (account) => {
    if (data[account.email]) throw new Error('unique violation');
    data[account.email] = { ...account };
  },
  getAccountByEmail: (email) => {
    return data[email] || null;
  },
});

module.exports = { accounts };
