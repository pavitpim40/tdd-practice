const { meters } = require('../../../src/meters/meters');
const { pricePlanNames } = require('../../../src/price-plans/price-plans');
const { readings } = require('../../../src/electricity-readings/readings-service');
const { compare, recommend } = require('../../../src/price-plans/price-plans-controller');

describe('price plans', () => {
  it('should compare usage cost for all price plans', () => {
    // Arrange
    const { getReadings } = readings({
      [meters.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected = {
      pricePlanComparisons: [
        {
          [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
        },
        {
          [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
        },
        {
          [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
        },
      ],
      smartMeterId: meters.METER0,
    };

    const request = {
      params: {
        smartMeterId: meters.METER0,
      },
      query: {},
    };

    // Act
    const recommendation = compare(getReadings, request);

    expect(recommendation).toEqual(expected);
  });

  it('should recommend usage cost for all price plans by ordering from cheapest to expensive', () => {
    const { getReadings } = readings({
      [meters.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected = [
      {
        [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
      },
      {
        [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
      },
      {
        [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
      },
    ];

    const recommendation = recommend(getReadings, {
      params: {
        smartMeterId: meters.METER0,
      },
      query: {},
    });

    expect(recommendation).toEqual(expected);
  });

  it('should limit recommendation', () => {
    const { getReadings } = readings({
      [meters.METER0]: [
        { time: 1607686125, reading: 0.26785 },
        { time: 1607599724, reading: 0.26785 },
        { time: 1607513324, reading: 0.26785 },
      ],
    });

    const expected = [
      {
        [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
      },
      {
        [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
      },
    ];

    const recommendation = recommend(getReadings, {
      params: {
        smartMeterId: meters.METER0,
      },
      query: {
        limit: 2,
      },
    });

    expect(recommendation).toEqual(expected);
  });
});
