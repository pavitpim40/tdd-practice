const express = require('express');

const mountPricePlanRoute = require('./price-plans/price-plans-route');
const mountPriceReadingsRoute = require('./readings/readings-route');

const app = express();
app.use(express.json());

mountPriceReadingsRoute(app);
mountPricePlanRoute(app);

module.exports = app;
