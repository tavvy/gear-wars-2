
'use strict';

var express = require('express');
var router = express.Router();

router.use('/keysearch', require('../controllers/keysearch'));
router.use('/characters', require('../controllers/characters'));
router.use('/items', require('../controllers/items'));
router.use('/skins', require('../controllers/skins'));

// not found error response

module.exports = router;