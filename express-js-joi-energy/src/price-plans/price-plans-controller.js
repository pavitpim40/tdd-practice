const { pricePlans } = require('./price-plans');
const { usageForAllPricePlans } = require('../usage/usage');

const recommend = (getReadings, req) => {
  const meter = req.params.smartMeterId;
  // console.log(usageForAllPricePlans(pricePlans, getReadings(meter)));

  // const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort(
  //   (a, b) => extractCost(a) - extractCost(b)
  // );

  const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort(
    (a, b) => extractCost(a) - extractCost(b)
  );

  if ('limit' in req.query) {
    return pricePlanComparisons.slice(0, req.query.limit);
  }
  return pricePlanComparisons;
};

const extractCost = (cost) => {
  for (let key in cost) {
    if (key in pricePlans) return cost[key];
  }
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

const change = ({ changePlan }, req) => {
  const meterId = req.params.smartMeterId;
  const newPlanId = req.body.pricePlan;
  const updatedPlan = changePlan(meterId, newPlanId);
  return { pricePlan: updatedPlan, smartMeterId: meterId };
};
module.exports = { recommend, compare, change };
