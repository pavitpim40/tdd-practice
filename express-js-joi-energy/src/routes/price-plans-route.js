const express = require('express');
const router = express.Router();

const { readings } = require('../electricity-readings/readings-service');
const { readingsData } = require('../electricity-readings/readings.data');

const { getReadings } = readings(readingsData);

router.get('/recommend/:smartMeterId', (req, res) => {
  res.send(recommend(getReadings, req));
});

router.post('/compare-all/:smartMeterId', (req, res) => {
  res.send(compare(getReadings, req));
});

module.exports = router;
