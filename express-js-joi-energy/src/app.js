const express = require('express');

const app = express();
app.use(express.json());

app.use('/readings', require('./readings/readings-route'));
app.use('/price-plans', require('./price-plans/price-plans-route'));

module.exports = app;
