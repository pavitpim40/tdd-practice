const { meters } = require('../../../src/meters/meters');
const { readingsData } = require('../../../src/electricity-readings/readings.data.js');

describe('generate data', () => {
  it('should generate readings for one meter', () => {
    expect(readingsData[meters.METER0].length).toBeGreaterThan(0);
  });
});
