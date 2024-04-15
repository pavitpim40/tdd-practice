const { meters, meterPricePlanMap } = require('../meters/meters.data');

const { pricePlanNames, pricePlans } = require('./price-plans');
const { readings } = require('../readings/readings');
const { compare, recommend, change } = require('./price-plans-controller');
const { pricePlanService } = require('./price-plans-service');

describe('price plans', () => {
  // describe('compare.controller', () => {
  //   it('should compare usage cost for all price plans', () => {
  //     // Arrange
  //     const { getReadings } = readings({
  //       [meters.METER0]: [
  //         { time: 1607686125, reading: 0.26785 },
  //         { time: 1607599724, reading: 0.26785 },
  //         { time: 1607513324, reading: 0.26785 },
  //       ],
  //     });
  //     const { getCurrentPricePlanFromMeterId } = pricePlanService(pricePlans, meterPricePlanMap);

  //     const expected = {
  //       usageCostComparisons: [
  //         {
  //           [pricePlanNames.PRICEPLAN0]: (0.26785 / 48) * 10,
  //         },
  //         {
  //           [pricePlanNames.PRICEPLAN1]: (0.26785 / 48) * 2,
  //         },
  //         {
  //           [pricePlanNames.PRICEPLAN2]: (0.26785 / 48) * 1,
  //         },
  //       ],
  //       smartMeterId: meters.METER0,
  //       currentPricePlan: 'price-plan-0',
  //     };

  //     // Act
  //     const recommendation = compare(
  //       { getReadings, getCurrentPricePlanFromMeterId },
  //       {
  //         params: {
  //           smartMeterId: meters.METER0,
  //         },
  //         query: {},
  //       }
  //     );

  //     // Assert
  //     expect(recommendation).toEqual(expected);
  //   });
  // });

  describe('recommend.controller', () => {
    let getReadings;
    let totalHourUsage = 48;
    let totalCurrentUsage = 0.26785;
    let totalKWH = totalCurrentUsage / totalHourUsage;
    beforeAll(() => {
      getReadings = readings({
        [meters.METER0]: [
          { time: 1607686125, reading: 0.26785 },
          { time: 1607599724, reading: 0.26785 },
          { time: 1607513324, reading: 0.26785 },
        ],
      }).getReadings;
    });
    it('should recommend usage cost for all price plans by ordering from cheapest to expensive', () => {
      const expected = [
        {
          [pricePlanNames.PRICEPLAN2]: totalKWH * 1,
        },
        {
          [pricePlanNames.PRICEPLAN1]: totalKWH * 2,
        },
        {
          [pricePlanNames.PRICEPLAN0]: totalKWH * 10,
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

    // it('should limit recommendation', () => {
    //   const expected = [
    //     {
    //       [pricePlanNames.PRICEPLAN2]: totalKWH * 1,
    //     },
    //     {
    //       [pricePlanNames.PRICEPLAN1]: totalKWH * 2,
    //     },
    //   ];

    //   const recommendation = recommend(getReadings, {
    //     params: {
    //       smartMeterId: meters.METER0,
    //     },
    //     query: {
    //       limit: 2,
    //     },
    //   });

    //   expect(recommendation).toEqual(expected);
    // });
  });

  // describe('change.controller', () => {
  //   it('should return smartMeterId and new-current-plan', () => {
  //     // Arrange
  //     const requestObj = {
  //       body: {
  //         pricePlan: 'price-plan-2',
  //       },
  //       params: {
  //         smartMeterId: meters.METER0,
  //       },
  //       query: {},
  //     };

  //     const { changePlan } = pricePlanService({ ...pricePlans }, { ...meterPricePlanMap });
  //     // Act
  //     const result = change({ changePlan }, requestObj);

  //     // Assert
  //     expect(result).toEqual({ smartMeterId: meters.METER0, pricePlan: 'price-plan-2' });
  //   });
  // });
});
