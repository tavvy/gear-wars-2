
'use strict';

// Babel ES6/JSX Compiler
require('babel-register');

// web framework
var express = require('express');
var path = require('path');
// http req logger
var logger = require('morgan');
// parsing POST req data
var bodyParser = require('body-parser');


var _ = require('underscore');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var rp = require('request-promise');
var errors = require('request-promise/errors');

var routes = require('./app/routes');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//7D549F4F-47ED-6C4B-B17F-B791BFEA7CED49A8F2F1-B0F2-4770-9AD1-3A4C575CBF7E
/**
 * GET /api/keysearch
 * Check key is valid
 */
app.get('/api/keysearch', function(req, res, next) {
  let apikey = req.query.apikey;
  let keyPermissionsLookupUrl = 'https://api.guildwars2.com/v2/tokeninfo';

  let requestLoad = {
    url: keyPermissionsLookupUrl,
    headers: {
      Authorization : 'Bearer ' + apikey
    }
  };

  rp(requestLoad)
  .then(function (body) {
    let data = JSON.parse(body);
    res.send(data);
  })
  .catch(errors.StatusCodeError, function (reason) {
    // The server responded with a status codes other than 2xx.
    // Check reason.response.statusCode.
    res.status(reason.response.statusCode).send(
      'gw2api error: ' + reason.response.statusCode
    );
  })
  .catch(errors.RequestError, function (reason) {
    // The request failed due to technical reasons.
    // reason.cause is the Error object Request would pass into a callback
    // TO DO: handle better
    res.status(500).send(
      'request error: ' + reason.cause
    );
  })

});

/**
 * GET /api/characters
 * Find characters on api key
 */
app.get('/api/characters', function(req, res, next) {
  let apikey = req.query.apikey;
  let charactersIdLookupUrl = 'https://api.guildwars2.com/v2/characters/';

  let requestLoad = {
    url: charactersIdLookupUrl,
    headers: {
    	Authorization : 'Bearer ' + apikey
    }
  };

  rp(requestLoad)
	.then(function (body) {
    // TODO: best place to do this?
    // transform array into object
    let data = {};
		data.characters = JSON.parse(body);
		res.send(data);
	})
  .catch(errors.StatusCodeError, function (reason) {
    // The server responded with a status codes other than 2xx.
    // Check reason.response.statusCode.
    res.status(500).send('gw2api error: ' + reason.response.statusCode)
  })
	.catch(errors.RequestError, function (reason) {
		// The request failed due to technical reasons.
    // reason.cause is the Error object Request would pass into a callback
		res.status(500).send('request error: ' + reason.cause);
	})

});

/**
 * GET /api/character
 * Find character on api key with name
 */
app.get('/api/character', function(req, res, next) {
  let apikey = req.query.apikey;
  let character = req.query.characterName ? req.query.characterName : null;
  let charactersIdLookupUrl = 'https://api.guildwars2.com/v2/characters/';

  let requestLoad = {
    url: charactersIdLookupUrl + character,
    headers: {
      Authorization : 'Bearer ' + apikey
    }
  };

  rp(requestLoad)
  .then(function (body) {
    let data = JSON.parse(body);
    res.send(data);
  })
  .catch(errors.StatusCodeError, function (reason) {
    // The server responded with a status codes other than 2xx.
    // Check reason.response.statusCode.
    if(reason.response.statusCode && reason.response.statusCode == 403) {
      res.status(500).send('gw2api error: ' + reason.response.statusCode + ' invalid key')
    } else {
      res.status(500).send('gw2api error: ' + reason.response.statusCode)
    }
  })
  .catch(errors.RequestError, function (reason) {
    // The request failed due to technical reasons.
    // reason.cause is the Error object Request would pass into a callback
    res.status(500).send('request error: ' + reason.cause);
  })

});

/**
 * GET /api/items
 * Find items
 */
app.get('/api/items', function(req, res, next) {
  let itemIds = req.query.itemIds ? req.query.itemIds : null;
  let itemLookupUrl = 'https://api.guildwars2.com/v2/items?ids=';

  let requestLoad = {
    url: itemLookupUrl + itemIds
  };

  rp(requestLoad)
  .then(function (body) {
    // TODO: best place to do this?
    // transform array into object
    let data = JSON.parse(body);
    res.send(data);
  })
  .catch(errors.StatusCodeError, function (reason) {
    // The server responded with a status codes other than 2xx.
    // Check reason.response.statusCode.
    res.status(500).send('Items - gw2api error: ' + reason.response.statusCode)
  })
  .catch(errors.RequestError, function (reason) {
    // The request failed due to technical reasons.
    // reason.cause is the Error object Request would pass into a callback
    res.status(500).send('Items -request error: ' + reason.cause);
  })
});

/**
 * GET /api/skins
 * Find skins
 */
app.get('/api/skins', function(req, res, next) {
  let skinIds = req.query.skinIds ? req.query.skinIds : null;
  let skinLookupUrl = 'https://api.guildwars2.com/v2/skins?ids=';

  let requestLoad = {
    url: skinLookupUrl + skinIds
  };

  rp(requestLoad)
  .then(function (body) {
    // TODO: best place to do this?
    // transform array into object
    let data = JSON.parse(body);
    res.send(data);
  })
  .catch(errors.StatusCodeError, function (reason) {
    // The server responded with a status codes other than 2xx.
    // Check reason.response.statusCode.
    res.status(500).send('Skins - gw2api error: ' + reason.response.statusCode)
  })
  .catch(errors.RequestError, function (reason) {
    // The request failed due to technical reasons.
    // reason.cause is the Error object Request would pass into a callback
    res.status(500).send('Skins -request error: ' + reason.cause);
  })
});



app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    console.log('middleware');
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});