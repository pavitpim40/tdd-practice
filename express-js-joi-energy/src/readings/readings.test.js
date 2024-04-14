const { meters } = require('../meters/meters.data');
const { readings } = require('./readings');
const { readingsData } = require('./readings.data');

describe('readings', () => {
  describe('GET : readings', () => {
    it('should get readings', () => {
      const { getReadings } = readings(readingsData);

      expect(getReadings(meters.METER0).length).toBeGreaterThan(0);
    });

    it('should get readings with meter id', () => {
      const { getReadings } = readings(readingsData);

      expect(getReadings(meters.METER1)[0]).toHaveProperty('time');
      expect(getReadings(meters.METER1)[0]).toHaveProperty('reading');
    });

    it("should get empty array if can't find meter id", () => {
      const { getReadings } = readings(readingsData);

      expect(getReadings('meter-no')).toHaveLength(0);
    });
  });

  describe('SET : readings', () => {
    it('should set readings with meter id', () => {
      const { getReadings, setReadings } = readings(readingsData);

      const length = getReadings(meters.METER0).length;

      setReadings(meters.METER0, [
        { time: 923874692387, reading: 0.26785 },
        { time: 923874692387, reading: 0.26785 },
        { time: 923874692387, reading: 0.111 },
      ]);

      const newLength = getReadings(meters.METER0).length;

      expect(length + 3).toEqual(newLength);
    });
  });

  describe('GET : readings in time-range', () => {
    it('should return reading in specific time', () => {
      // arrange
      let start = new Date('2024-04-01').getTime() / 1000; // start-UNIX : 1711929600
      let end = new Date('2024-04-08').getTime() / 1000; //  end-UNIX : 1712534400

      const { getReadingsInTime } = readings({
        [meters.METER0]: [
          { time: 1712539900, reading: 0.26785 },
          { time: 1712534400, reading: 0.26785 }, // end-UNIX
          { time: 1711929600, reading: 0.111 }, // start-UNIX
        ],
      });

      // Act
      const result = getReadingsInTime(meters.METER0, start, end);

      // Asset
      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ time: 1712534400, reading: 0.26785 });
      expect(result[1]).toEqual({ time: 1711929600, reading: 0.111 });
    });

    it('should return empty array if it not any readings in specific time', () => {
      // arrange
      let start = new Date('2024-04-01').getTime() / 1000; // start-UNIX : 1711929600
      let end = new Date('2024-04-08').getTime() / 1000; //  end-UNIX : 1712534400

      const { getReadingsInTime } = readings({
        [meters.METER0]: [
          { time: 1712559900, reading: 0.26785 },
          { time: 1712549900, reading: 0.26785 },
          { time: 1712539900, reading: 0.26785 },
        ],
      });

      // Act
      const result = getReadingsInTime(meters.METER0, start, end);

      // Asset
      expect(result.length).toBe(0);
    });

    it('should return empty array if there is no meter', () => {
      // arrange
      let start = new Date('2024-04-01').getTime() / 1000; // start-UNIX : 1711929600
      let end = new Date('2024-04-08').getTime() / 1000; //  end-UNIX : 1712534400

      const { getReadingsInTime } = readings({});

      // Act
      const result = getReadingsInTime(meters.METER0, start, end);

      // Asset
      expect(result.length).toBe(0);
    });
  });
});
