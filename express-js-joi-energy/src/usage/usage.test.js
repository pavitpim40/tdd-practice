const { meters, meterPricePlanMap } = require('../meters/meters.data');
const { pricePlanNames, pricePlans } = require('../price-plans/price-plans');
const { readings } = require('../readings/readings');
const { average, timeElapsedInHours, usage, usageCost, usageForAllPricePlans } = require('./usage');

describe('usage', () => {
  describe('average function', () => {
    it('should average all readings for a meter', () => {
      const { getReadings } = readings({
        [meters.METER0]: [
          { time: 923874692387, reading: 0.26785 },
          { time: 923874692387, reading: 0.26785 },
          { time: 923874692387, reading: 0.26785 },
        ],
      });

      const averageMeter0 = average(getReadings(meters.METER0));

      expect(averageMeter0).toBe(0.26785);
    });
  });

  describe('timeElapse function', () => {
    it('should get time elapsed in hours for all readings for a meter', () => {
      const { getReadings } = readings({
        [meters.METER0]: [
          { time: 1607686135, reading: 0.26785 },
          { time: 1607599724, reading: 0.26785 },
          { time: 1607512024, reading: 0.26785 },
        ],
      });
      const totalHour = 48;

      const timeElapsedMeter0 = timeElapsedInHours(getReadings(meters.METER0));

      expect(timeElapsedMeter0).toBe(totalHour);
    });
  });

  describe('usage in KWH', () => {
    it('should get usage for all readings for a meter', () => {
      const { getReadings } = readings({
        [meters.METER0]: [
          { time: 1607686125, reading: 0.26785 },
          { time: 1607599724, reading: 0.26785 },
          { time: 1607513324, reading: 0.26785 },
        ],
      });
      const totalUsage = 0.26785;
      const totalHour = 48;
      let totalUsageInKWH = totalUsage / totalHour;

      const usageMeter0 = usage(getReadings(meters.METER0));

      expect(usageMeter0).toBe(totalUsageInKWH);
    });
  });

  describe('usage with cost in price-plan', () => {
    it('should get usage cost for all readings for a meter', () => {
      const { getReadings } = readings({
        [meters.METER2]: [
          { time: 1607686125, reading: 0.26785 },
          { time: 1607599724, reading: 0.26785 },
          { time: 1607513324, reading: 0.26785 },
        ],
      });
      const totalUsage = 0.26785;
      const totalHour = 48;
      let totalUsageInKWH = totalUsage / totalHour;

      const rate = meterPricePlanMap[meters.METER2].rate;
      const usageCostForMeter = usageCost(getReadings(meters.METER2), rate);

      expect(usageCostForMeter).toBe(totalUsageInKWH * 1);
    });
  });

  describe('usage with const in all price-plan', () => {
    it('should get usage cost for all readings for all price plans', () => {
      const { getReadings } = readings({
        [meters.METER2]: [
          { time: 1607686125, reading: 0.26785 },
          { time: 1607599724, reading: 0.26785 },
          { time: 1607513324, reading: 0.26785 },
        ],
      });
      const totalUsage = 0.26785;
      const totalHour = 48;
      let totalUsageInKWH = totalUsage / totalHour;

      const expected = [
        {
          [pricePlanNames.PRICEPLAN0]: totalUsageInKWH * 10,
        },
        {
          [pricePlanNames.PRICEPLAN1]: totalUsageInKWH * 2,
        },
        {
          [pricePlanNames.PRICEPLAN2]: totalUsageInKWH * 1,
        },
      ];

      const usageForAllPricePlansArray = usageForAllPricePlans(
        pricePlans,
        getReadings(meters.METER2)
      );

      expect(usageForAllPricePlansArray).toEqual(expected);
    });
  });
});
