
'use strict';

var rp = require('request-promise');
var errors = require('request-promise/errors');

function renderGw2apiError(reason) {
  var response = {
    name: reason.name || null,
    statusCode: reason.statusCode || null,
    reason: reason.message || null
  };
  return response;
}

export function makeRequest(payload, callback) {
  payload.json = true;

  rp(payload)
  .then(function (body) {
    callback(null, body);
  })
  .catch(errors.StatusCodeError, function (reason) {
    // The server responded with a status code other than 2xx
    reason.message = reason.statusCode + ' - ' + reason.error.text;
    callback(400, renderGw2apiError(reason));
  })
  .catch(errors.RequestError, function (reason) {
    // The request failed due to technical reasons
    callback(500, renderGw2apiError(reason));
  })
}