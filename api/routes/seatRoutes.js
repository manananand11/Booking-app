const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seatsController');

router.get('/', seatsController.getSeats);
router.post('/reset', seatsController.resetSeats);
router.post('/reserve', seatsController.reserveSeats);

module.exports = router;
