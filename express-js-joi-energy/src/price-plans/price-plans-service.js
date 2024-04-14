const pricePlanService = (pricePlan, meterPricePlanMap) => ({
  getCurrentPricePlanFromMeterId: (meterId) => {
    if (!meterPricePlanMap[meterId]) return '';
    const supplierName = meterPricePlanMap[meterId].supplier;
    for (let [planId, detail] of Object.entries(pricePlan)) {
      if (detail.supplier === supplierName) return planId;
    }
  },
  changePlan: (meterId, newPlanId) => {
    const newPlanDetail = pricePlan[newPlanId];
    meterPricePlanMap[meterId] = newPlanDetail;
    // console.log(meterPricePlanMap[meterId]);
    return meterPricePlanMap[meterId];
  },
});

module.exports = { pricePlanService };
