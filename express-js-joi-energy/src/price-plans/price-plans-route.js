const { readings } = require('../readings/readings');
const { readingsData } = require('../readings/readings.data');
const { recommend, compare, change } = require('../price-plans/price-plans-controller');
const { pricePlans } = require('../price-plans/price-plans');
const { meterPricePlanMap } = require('../meters/meters.data');
const { pricePlanService } = require('./price-plans-service');

const { getReadings } = readings(readingsData);
const { getCurrentPricePlanFromMeterId, changePlan } = pricePlanService(
  pricePlans,
  meterPricePlanMap
);

const mountPricePlanRoute = (app) => {
  app.get('/price-plans/recommend/:smartMeterId', (req, res) => {
    res.send(recommend(getReadings, req));
  });

  app.get('/price-plans/compare-all/:smartMeterId', (req, res) => {
    const meterId = req.params.smartMeterId;
    if (!meterPricePlanMap[meterId]) {
      return res.status(404).json({
        title: 'smartMeterNotFoundError',
        message: 'smart-meter not found',
      });
    }
    res.send(compare({ getReadings, getCurrentPricePlanFromMeterId }, req));
  });

  app.post('/price-plans/change-plan/:smartMeterId', (req, res) => {
    res.send(change({ changePlan }, req));
  });
};

module.exports = mountPricePlanRoute;
