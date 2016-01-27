
'use strict';

var gw2api = require('../models/gw2api');
var express = require('express');
var router = express.Router();

const BASE_URL = 'https://api.guildwars2.com/v2';
/**
 * GET /api/keysearch
 * Check key is valid
 */
router.get('/', function(req, res, next) {
  let apikey = req.query.apikey;
  let keyPermissionsLookupUrl = BASE_URL + '/tokeninfo';

  let requestLoad = {
    url: keyPermissionsLookupUrl,
    headers: {
      Authorization : 'Bearer ' + apikey
    }
  };

  gw2api.makeRequest(requestLoad, function(err, response) {
    if (err) {
      return res.status(err).send(response);
    }
    res.send(response);
  });

});

module.exports = router;
