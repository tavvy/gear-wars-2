
'use strict';

var gw2api = require('../models/gw2api');
var express = require('express');
var router = express.Router();

const BASE_URL = 'https://api.guildwars2.com/v2';
/**
 * GET /api/characters/:name
 * Find character with name on api key
 */
router.get('/:name', function(req, res, next) {
  let apikey = req.query.apikey;
  let character = req.params.name ? req.params.name : null;
  let charactersIdLookupUrl = BASE_URL + '/characters/';

  let requestLoad = {
    url: charactersIdLookupUrl + character,
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
/**
 * GET /api/characters
 * Find characters on api key
 */
router.get('/', function(req, res, next) {
  let apikey = req.query.apikey;
  let charactersIdLookupUrl = BASE_URL + '/characters/';

  let requestLoad = {
    url: charactersIdLookupUrl,
    headers: {
      Authorization : 'Bearer ' + apikey
    }
  };

  gw2api.makeRequest(requestLoad, function(err, response) {
    if (err) {
      return res.status(err).send(response);
    }
    let data = {};
    data.characters = response;
    res.send(data);
  });

});

module.exports = router;
