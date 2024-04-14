const pricePlanService = (pricePlan, meterPricePlanMap) => ({
  getCurrentPricePlanFromMeterId: (meterId) => {
    if (!meterPricePlanMap[meterId]) return '';
    const supplierName = meterPricePlanMap[meterId].supplier;
    for (let [planId, detail] of Object.entries(pricePlan)) {
      if (detail.supplier === supplierName) return planId;
    }
  },
  changePlan: (meter, meterId, newPlanId) => {
    meter[meterId] = newPlanId;
    return meter[meterId];
  },
});

module.exports = { pricePlanService };
