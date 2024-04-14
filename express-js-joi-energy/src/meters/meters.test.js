const { accountsData } = require('../accounts/accounts.data');
const { meters } = require('./meters');
describe('account service', () => {
  describe('AddMeter : add meter to account', () => {
    it('should return array of add meters when add meter to account', () => {
      // Arrange
      let data = {
        [accountsData.USER0]: [],
      };
      const { addMeter } = createMeterService(data);

      // Act
      const allMeterInAccount = addMeter(accountsData.USER0, meters.METER0);

      // Assert
      expect(allMeterInAccount.length).toBe(1);
    });

    it("should add new account and meter when account doesn't exits", () => {
      const { addMeter } = createMeterService();

      // Act
      const allMeterInAccount = addMeter(accountsData.USER0, meters.METER0);

      // Assert
      expect(allMeterInAccount.length).toBe(1);
    });
  });

  describe('getAllMeter : get all meter from account-id', () => {
    it('should get all meter in account', () => {
      // arrange
      const initData = {
        [accountsData.USER0]: [meters.METER0, meters.METER1],
      };
      const { getAllMeter } = createMeterService(initData);

      // Act
      const result = getAllMeter(accountsData.USER0);

      // Assert
      expect(result.length).toBe(2);
      expect(result[0]).toEqual(meters.METER0);
      expect(result[1]).toEqual(meters.METER1);
    });

    it('should return empty array when there is no meter in account', () => {
      const initData = {
        [accountsData.METER0]: [],
      };
      const { getAllMeter } = createMeterService(initData);

      // Act
      const result = getAllMeter(accountsData.USER0);

      // Assert
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should return empty array when there is no account', () => {
      const { getAllMeter } = createMeterService();

      // Act
      const result = getAllMeter();

      // Assert
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('removeMeter : remove meter from meterId and accountId', () => {
    it('should remove meter from account', () => {
      // arrange
      let initData = { [accountsData.USER0]: [meters.METER0] };
      const { removeMeter, getAllMeter } = createMeterService(initData);

      // act
      removeMeter(accountsData.USER0, meters.METER0);

      // assert
      const result = getAllMeter(accountsData.USER0);

      expect(result.length).toBe(0);
    });

    it('should remove correct and specific-meter from account', () => {
      // arrange
      let initData = { [accountsData.USER0]: [meters.METER0, meters.METER1, meters.METER2] };
      const { removeMeter, getAllMeter } = createMeterService(initData);

      // act
      removeMeter(accountsData.USER0, meters.METER1);

      // assert
      const result = getAllMeter(accountsData.USER0);

      expect(result.length).toBe(2);
      expect(result[0]).toBe(meters.METER0);
      expect(result[1]).toBe(meters.METER2);
    });

    it('should not remove anything when there is no meter in account', () => {
      let initData = { [accountsData.USER0]: [] };
      const { removeMeter, getAllMeter } = createMeterService(initData);

      removeMeter(accountsData.USER0, meters.METER1);

      const result = getAllMeter(accountsData.USER0);

      expect(result.length).toBe(0);
    });

    it('should not remove anything when there is no account', () => {
      const { removeMeter, getAllMeter } = createMeterService();

      removeMeter(accountsData.USER0, meters.METER1);

      const result = getAllMeter(accountsData.USER0);

      expect(result.length).toBe(0);
    });
  });
});

function createMeterService(data = {}) {
  return meters(data);
}
