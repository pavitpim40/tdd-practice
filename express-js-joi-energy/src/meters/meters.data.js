const { pricePlans, pricePlanNames } = require('../price-plans/price-plans');

// For Domain
const meters = {
  METER0: 'smart-meter-0',
  METER1: 'smart-meter-1',
  METER2: 'smart-meter-2',
};

// For Map to Other Domain
const meterPricePlanMap = {
  [meters.METER0]: pricePlans[pricePlanNames.PRICEPLAN0],
  [meters.METER1]: pricePlans[pricePlanNames.PRICEPLAN1],
  [meters.METER2]: pricePlans[pricePlanNames.PRICEPLAN2],
};

/*
meterPricePlanMap = { 
  'smart-meter-0' :  {
    supplier:  "Dr Evil's Dark Energy",
    rate: 10,
  },
}

pricePlans = {
  'price-plan-0' :  {
    supplier:  "Dr Evil's Dark Energy",
    rate: 10,
  },
}
*/

module.exports = { meterPricePlanMap, meters };
