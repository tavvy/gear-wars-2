'use strict';

import alt from '../alt';
import {assign} from 'underscore';

class CharactersActions {
  constructor() {
    this.generateActions(
      'updateApikey',
      'getCharactersSuccess',
      'getCharactersFail'
    );
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

export default alt.createActions(CharactersActions);