const { accountsData } = require('./accounts.data');
const { accounts } = require('./accounts');

describe('account service', () => {
  describe('ADD Account', () => {
    it('should add account', () => {
      // Arrange
      let accountData = {};
      let newAccount = 'pavit@mail.com';
      const { addAccount } = accounts(accountData);
      // Act
      addAccount(newAccount);

      // Assert
      expect(accountData[newAccount]).toBe(newAccount);
    });

    it('should add multiple account correctly', () => {
      let accountData = {};
      let newAccount1 = 'john@mail.com';
      let newAccount2 = 'jane@mail.com';
      const { addAccount } = accounts(accountData);

      // act
      addAccount(newAccount1);
      addAccount(newAccount2);

      // assert
      expect(accountData[newAccount1]).toBe(newAccount1);
      expect(accountData[newAccount2]).toBe(newAccount2);
    });

    it('should not add duplicate account', () => {
      let accountData = {};
      let newAccount1 = 'john@mail.com';
      const { addAccount } = accounts(accountData);

      // act
      addAccount(newAccount1);

      // assert
      expect(accountData[newAccount1]).toBe(newAccount1);
      expect(() => addAccount(newAccount1)).toThrow();
    });
  });
});
