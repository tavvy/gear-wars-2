
'use strict';

var gw2api = require('../models/gw2api');
var express = require('express');
var router = express.Router();

const BASE_URL = 'https://api.guildwars2.com/v2';
/**
 * GET /api/items
 * Find items
 */
router.get('/', function(req, res, next) {
  let itemIds = req.query.ids ? req.query.ids : null;
  let itemLookupUrl = BASE_URL + '/items?ids=';

  let requestLoad = {
    url: itemLookupUrl + itemIds
  };

  gw2api.makeRequest(requestLoad, function(err, response) {
    if (err) {
      return res.status(err).send(response);
    }
    res.send(response);
  });

});

module.exports = router;
