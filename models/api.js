
'use strict';

export function handleRequest(payload, callback) {
  $.ajax({
    url: payload.url,
    data: payload.data
  })
    .done((data) => {
      let response = {
        payload: payload,
        response: data
      };
      callback(null, response);
    })
    .fail((err) => {
      let error = {
        payload: payload,
        err: {
          statusCode: err.responseJSON.statusCode,
          responseText: err.responseJSON.reason
        }
      };
      callback(error);
    });
}