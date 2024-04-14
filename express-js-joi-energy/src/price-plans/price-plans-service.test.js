const { pricePlanService } = require('./price-plans-service');
const { pricePlans } = require('./price-plans');
const { meters, meterPricePlanMap } = require('../meters/meters.data');

describe('price-plans service', () => {
  describe('get price-plan from meterId', () => {
    it('should retrieve price-plan from supplier name', () => {
      // meterId ==> current price plan
      // Arrange
      let meterId = 'smart-meter-0';
      let expectedPricePlan = 'price-plan-0';
      const { getCurrentPricePlanFromMeterId } = pricePlanService(pricePlans, meterPricePlanMap);

      // Act
      const result = getCurrentPricePlanFromMeterId(meterId);
      // Assert
      expect(result).toBe(expectedPricePlan);
    });

    it('should return empty string when has no price-plan for meter', () => {
      // Arrange
      let meterId = 'smart-meter-fake-0';
      let expectedPricePlan = '';
      const { getCurrentPricePlanFromMeterId } = pricePlanService(pricePlans, meterPricePlanMap);

      // Act
      const result = getCurrentPricePlanFromMeterId(meterId);
      // Assert
      expect(result).toBe(expectedPricePlan);
    });
  });

  describe('change price plan from meterId', () => {
    // arrange
    let meterId = 'smart-meter-0';
    const planId = 'price-plan-2';
    const { getCurrentPricePlanFromMeterId, changePlan } = pricePlanService(
      pricePlans,
      meterPricePlanMap
    );
    // act
    const result = changePlan(meters, meterId, planId);
    const newPricePlan = getCurrentPricePlanFromMeterId(meterId);

    // assert
    expect(newPricePlan).toBe(planId);
  });
});
