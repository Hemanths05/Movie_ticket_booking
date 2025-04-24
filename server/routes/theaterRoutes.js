const express = require('express');
const router = express.Router();
const {getTheaters} = require('../controllers/theaterController');

router.get('/', getTheaters);

module.exports = router;
