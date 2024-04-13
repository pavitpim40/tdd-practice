const { meters, meterPricePlanMap } = require('../../../src/meters/meters');
const { pricePlanNames, pricePlans } = require('../../../src/price-plans/price-plans');
const { readings } = require('../../../src/electricity-readings/readings-service');
const {
  average,
  timeElapsedInHours,
  usage,
  usageCost,
  usageForAllPricePlans,
} = require('../../../src/usage/usage');

describe('usage-service', () => {
  //
  it('should average all readings for a meter', () => {
    // Arrange
    const mockReadings = [
      { time: 923874692387, reading: 0.26785 },
      { time: 923874692387, reading: 0.26785 },
      { time: 923874692387, reading: 0.26785 },
    ];
    // Act
    // const averageMeter0 = average(getReadings(meters.METER0));
    const averageMeter0 = average(mockReadings);

    // Assert
    expect(averageMeter0).toBe(0.26785);
  });

  it('should get time elapsed in hours for all readings for a meter', () => {
    // Arrange
    const mockReadings = [
      { time: 1607686135, reading: 0.26785 },
      { time: 1607599724, reading: 0.26785 },
      { time: 1607512024, reading: 0.26785 },
    ];

    // Act
    const timeElapsedMeter0 = timeElapsedInHours(mockReadings);

    // Assert
    expect(timeElapsedMeter0).toBe(48);
  });

  it('should get usage for all readings for a meter', () => {
    // Arrange
    const mockReadings = [
      { time: 1607686125, reading: 0.26785 },
      { time: 1607599724, reading: 0.26785 },
      { time: 1607513324, reading: 0.26785 },
    ];

    // Act
    const usageMeter0 = usage(mockReadings);

    // Assert
    expect(usageMeter0).toBe(0.26785 / 48);
  });

  it('should get usage cost for all readings for a meter', () => {
    // Arrange
    const mockReadings = [
      { time: 1607686125, reading: 0.26785 },
      { time: 1607599724, reading: 0.26785 },
      { time: 1607513324, reading: 0.26785 },
    ];
    const rate = 1;

    // Act
    const usageCostForMeter = usageCost(mockReadings, rate);

    // Assert
    expect(usageCostForMeter).toBe((0.26785 / 48) * 1);
  });

  it('should get usage cost for all readings for all price plans', () => {
    const { getReadings } = readings({
      [meters.METER2]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected = [
      {
        [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
      },
      {
        [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
      },
      {
        [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
      },
    ];

    const usageForAllPricePlansArray = usageForAllPricePlans(
      pricePlans,
      getReadings(meters.METER2)
    );

    expect(usageForAllPricePlansArray).toEqual(expected);
  });
});
