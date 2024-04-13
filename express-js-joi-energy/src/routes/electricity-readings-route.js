const express = require('express');
const router = express.Router();

const { readings } = require('../electricity-readings/readings-service');
const { readingsData } = require('../electricity-readings/readings.data');
const { read, store } = require('../electricity-readings/readings-controller');

const { getReadings, setReadings } = readings(readingsData);

router.get('/read/:smartMeterId', (req, res) => {
  res.send(read(getReadings, req));
});

router.post('/store', (req, res) => {
  res.send(store(setReadings, req));
});

module.exports = router;
