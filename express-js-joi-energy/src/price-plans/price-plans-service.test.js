const { pricePlanService } = require('./price-plans-service');
const { pricePlans } = require('./price-plans');
const { meters, meterPricePlanMap } = require('../meters/meters.data');

/*
Schema
meterData = {
  METER0 : 'smart-meter-0',
  METER1 : 'smart-meter-1',
  METER2 : 'smart-meter-2',
}

meterPricePlanMap = {
 'smart-meter-0' :  {
    supplier:  "Dr Evil's Dark Energy",
    rate: 10,
  },
 'smart-meter-1' :  {
    supplier:  "Dr Evil's Dark Energy",
    rate: 10,
  },
}

pricePlan = {
  "price-plan-0" : {
    supplier : "Dr Evil's Dark Energy",
    rate :10
  }
}
*/

describe('price-plans service', () => {
  describe('get price-plan from meterId', () => {
    it('should retrieve price-plan from supplier name', () => {
      // meterId ==> current price plan
      // Arrange
      let meterId = 'smart-meter-0';
      let expectedPricePlan = 'price-plan-0';
      const { getCurrentPricePlanFromMeterId } = createPricePlanService();

      // Act
      const result = getCurrentPricePlanFromMeterId(meterId);
      // Assert
      expect(result).toBe(expectedPricePlan);
    });

    it('should return empty string when has no price-plan for meter', () => {
      // Arrange
      let meterId = 'smart-meter-fake-0';
      let expectedPricePlan = '';
      const { getCurrentPricePlanFromMeterId } = createPricePlanService();

      // Act
      const result = getCurrentPricePlanFromMeterId(meterId);
      // Assert
      expect(result).toBe(expectedPricePlan);
    });
  });

  describe('change price plan from meterId', () => {
    // arrange

    const { getCurrentPricePlanFromMeterId, changePlan } = createPricePlanService();
    // act
    const result = changePlan('smart-meter-0', 'price-plan-2');

    // assert
    expect(result).toBe('price-plan-2');
  });
});

function createPricePlanService() {
  return pricePlanService({ ...pricePlans }, { ...meterPricePlanMap });
}
