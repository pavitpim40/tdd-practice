const request = require('supertest');
const app = require('../../src/app');
const { pricePlanService } = require('../../src/price-plans/price-plans-service');

const ENDPOINT = '/price-plans';

describe(ENDPOINT, () => {
  test('GET' + ENDPOINT, async () => {
    // act
    const response = await request(app).get(`${ENDPOINT}/compare-all/smart-meter-0`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.smartMeterId).toBe('smart-meter-0');
    expect(response.body.currentPricePlan).toBeDefined();
    expect(response.body.usageCostComparisons).toBeDefined();
  });

  test('GET by not found' + ENDPOINT, async () => {
    const response = await request(app).get(`${ENDPOINT}/compare-all/smart-meter-99`).send();

    expect(response.statusCode).toBe(404);
    expect(response.body.title).toBe('smartMeterNotFoundError');
    expect(response.body.message).toBe('smart-meter not found');
  });
});
