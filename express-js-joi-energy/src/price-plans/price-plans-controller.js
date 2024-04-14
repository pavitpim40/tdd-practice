const { pricePlans } = require('./price-plans');
const { usageForAllPricePlans } = require('../usage/usage');

const recommend = (getReadings, req) => {
  const meter = req.params.smartMeterId;

  const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort(
    (a, b) => extractCost(a) - extractCost(b)
  );
  // const pricePlan = usageForAllPricePlans(pricePlans, getReadings(meter));

  // console.log(getReadings(meter));
  // console.log('A', pricePlan);
  // console.log('B', pricePlanComparisons);
  if ('limit' in req.query) {
    return pricePlanComparisons.slice(0, req.query.limit);
  }
  return pricePlanComparisons;
};

const extractCost = (cost) => {
  // console.log(cost);
  const [, value] = Object.entries(cost).find(([key]) => {
    // console.log(key);
    return key in pricePlans;
  });
  return value;
};

const compare = ({ getReadings, getCurrentPricePlanFromMeterId }, req) => {
  const meter = req.params.smartMeterId;
  const usageCostComparisons = usageForAllPricePlans(pricePlans, getReadings(meter));
  const currentPricePlan = getCurrentPricePlanFromMeterId(meter);
  return {
    smartMeterId: req.params.smartMeterId,
    currentPricePlan,
    usageCostComparisons,
  };
};

module.exports = { recommend, compare };
