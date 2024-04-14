const { accounts } = require('./accounts');

describe('account service', () => {
  describe('ADD Account', () => {
    it('should add account', () => {
      // Arrange
      let accountData = {};
      let newAccount = {
        email: 'pavit@mail.com',
        firstName: 'pavit',
      };
      const { addAccount } = accounts(accountData);
      // Act
      addAccount(newAccount);

      // Assert
      expect(accountData[newAccount.email]).toEqual(newAccount);
    });

    it('should add multiple account correctly', () => {
      let accountData = {};
      let newAccount1 = {
        email: 'john@mail.com',
        firstName: 'john',
      };

      let newAccount2 = {
        email: 'jim@mail.com',
        firstName: 'jim',
      };

      const { addAccount } = accounts(accountData);

      // act
      addAccount(newAccount1);
      addAccount(newAccount2);

      // assert
      expect(accountData[newAccount1.email]).toEqual(newAccount1);
      expect(accountData[newAccount2.email]).toEqual(newAccount2);
    });

    it('should not add duplicate account', () => {
      let accountData = {};
      let newAccount1 = {
        email: 'john@mail.com',
        firstName: 'john',
      };

      const { addAccount } = accounts(accountData);

      // act
      addAccount(newAccount1);

      // assert
      expect(accountData[newAccount1.email]).toEqual(newAccount1);
      expect(() => addAccount(newAccount1)).toThrow();
    });
  });

  describe('GET Account by Email', () => {
    it('should return account detail when found by email', () => {
      const accountData = { 'john@mail.com': { email: 'john@mail.com', firstName: 'john' } };

      const { getAccountByEmail } = accounts(accountData);

      // Act
      const result = getAccountByEmail('john@mail.com');

      // Assert
      expect(result).toEqual({ email: 'john@mail.com', firstName: 'john' });
    });

    it('should return null when not found', () => {
      const accountData = { 'john@mail.com': { email: 'john@mail.com', firstName: 'john' } };

      const { getAccountByEmail } = accounts(accountData);

      // Act
      const result = getAccountByEmail('not-found@mail.com');

      // Assert
      expect(result).toBe(null);
    });
  });
});
