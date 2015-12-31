'use strict';

import alt from '../alt';
import {assign} from 'underscore';

class KeySearchActions {
  constructor() {
    this.generateActions(
      'updateApikey',
      'checkApikeySuccess',
      'checkApikeyFail'
    );
  }

  checkApikey(payload) {
    $.ajax({
      url: '/api/keysearch',
      data: {
        apikey: payload.apikey
      }
    })
      .done((data) => {
        //merge the payload and data
        console.log('ajax success')
        let response = assign({}, payload, data);
        this.checkApikeySuccess(response);
      })
      .fail((jqXhr) => {
        // make copy of payload
        let error = {
          responseText: jqXhr.responseText,
          statusCode: jqXhr.status
        }
        let response = assign({}, payload, error);
        this.checkApikeyFail(response);
      });
  }

}

export default alt.createActions(KeySearchActions);