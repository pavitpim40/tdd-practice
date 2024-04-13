const { read, store } = require('../../../src/electricity-readings/readings-controller');
const { readingsData } = require('../../../src/electricity-readings/readings.data.js');
const { readings } = require('../../../src/electricity-readings/readings-service');
const { meters } = require('../../../src/meters/meters');

// ไม่จัดการพวก status
describe('readings controller', () => {
  it('should get readings with meter id from params', () => {
    // Arrange
    const { getReadings } = readings(readingsData);
    const request = {
      params: {
        smartMeterId: meters.METER0,
      },
    };

    // Act
    const readingsForMeter = read(getReadings, request);

    // Assert
    expect(readingsForMeter).toEqual(readingsData[meters.METER0]);
  });

  it('should store readings with meter id and readings from body', () => {
    // Arrange
    const { setReadings, getReadings } = readings(readingsData);
    const originalLength = getReadings(meters.METER0).length;

    const fixture = {
      smartMeterId: meters.METER0,
      electricityReadings: [
        {
          time: 981438113,
          reading: 0.0503,
        },
        {
          time: 982087047,
          reading: 0.0213,
        },
      ],
    };

    // Act
    store(setReadings, {
      body: fixture,
    });

    // Assert
    const newLength = getReadings(meters.METER0).length;
    expect(newLength).toEqual(originalLength + 2);
  });
});
