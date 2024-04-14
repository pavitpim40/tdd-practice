const { pricePlanService } = require('./price-plans-service');
const { pricePlans } = require('./price-plans');
const { meterPricePlanMap } = require('../meters/meters.data');
describe('price-plans service', () => {
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
