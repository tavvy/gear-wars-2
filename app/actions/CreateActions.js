'use strict';

import alt from '../alt';
import {assign} from 'underscore';

class createActions {
  constructor() {
    this.generateActions(
      'updateApikey',
      'resetApikey',
      'setActiveCharacter',
      'checkApikeySuccess',
      'checkApikeyFail',
      'getCharactersSuccess',
      'getCharactersFail'
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

  getCharacters(payload) {
    $.ajax({
      url: '/api/characters',
      data: {
        apikey: payload.apikey
      }
    })
      .done((data) => {
        //merge the payload and data
        let response = assign({}, payload, data);
        this.getCharactersSuccess(response);
      })
      .fail((jqXhr) => {
        // make copy of payload
        let response = assign({}, payload);
        // insert error text
        response.error = jqXhr.responseText;;
        this.getCharactersFail(response);
      });
  }

}

export default alt.createActions(createActions);