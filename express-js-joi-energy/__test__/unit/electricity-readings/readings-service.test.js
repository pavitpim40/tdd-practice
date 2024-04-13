const { meters } = require('../../../src/meters/meters');
const { readings } = require('../../../src/electricity-readings/readings-service');
const { readingsData } = require('../../../src/electricity-readings/readings.data.js');

describe('electricity-readings services', () => {
  let getReadings;
  let setReadings;
  beforeEach(() => {
    let readingService = readings(readingsData);
    getReadings = readingService.getReadings;
    setReadings = readingService.setReadings;
  });
  it('should get not empty electricity-readings array if have record on meter', () => {
    // Act
    const result = getReadings(meters.METER0);

    // Assert
    expect(result.length).toBeGreaterThan(0);
  });

  it('should get electricity-readings with property time and reading', () => {
    // Act
    const result = getReadings(meters.METER0);

    // Assert
    expect(result[0]).toHaveProperty('time');
    expect(result[0]).toHaveProperty('reading');
  });

  it("should get empty array if can't find meter id", () => {
    // Act
    const result = getReadings('meter-no');

    // Assert
    expect(result).toHaveLength(0);
  });

  it('should set readings with meter id', () => {
    // Arrange
    const length = getReadings(meters.METER0).length;
    setReadings(meters.METER0, [
      { time: 923874692387, reading: 0.26785 },
      { time: 923874692387, reading: 0.26785 },
      { time: 923874692387, reading: 0.111 },
    ]);

    // Act
    const newLength = getReadings(meters.METER0).length;

    // Assert
    expect(newLength).toEqual(length + 3);
  });
});
