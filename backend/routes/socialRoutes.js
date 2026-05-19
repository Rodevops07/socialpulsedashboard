const express = require('express');
const router = express.Router();
const { getSocialStats } = require('../controllers/socialController');
const { getFullDashboard } = require('../controllers/dashboardController');

// Dono routes ko bind karo taaki koi bhi url fetch ho, error na aaye
router.get('/stats', getSocialStats);
router.get('/', getFullDashboard);

module.exports = router;