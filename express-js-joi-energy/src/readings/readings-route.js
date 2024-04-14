const { readings } = require('./readings');
const { readingsData } = require('./readings.data');
const { read, store } = require('./readings-controller');

const { getReadings, setReadings } = readings(readingsData);

const mountPriceReadingsRoute = (app) => {
  app.get('/readings/read/:smartMeterId', (req, res) => {
    res.send(read(getReadings, req));
  });

  app.post('/readings/store', (req, res) => {
    res.send(store(setReadings, req));
  });
};

module.exports = mountPriceReadingsRoute;
