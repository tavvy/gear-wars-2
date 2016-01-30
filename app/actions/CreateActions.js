'use strict';

import alt from '../alt';
import {assign} from 'underscore';
var api = require('../../models/api');

class createActions {
  constructor() {
    this.generateActions(
      'updateApikey',
      'resetApikey',
      'signalLoadingApikey',
      'setActiveCharacter',
      'checkApikeySuccess',
      'checkApikeyFail',
      'getCharactersSuccess',
      'getCharactersFail'
    );
  }

  checkApikey(payload) {
    this.signalLoadingApikey(true);
    api.handleRequest({
      url: '/api/keysearch',
      data: {
        apikey: payload.apikey
      }
    }, (err, result) => {
      this.signalLoadingApikey(false);
      if (err) {
        return this.checkApikeyFail(err);
      }
      this.checkApikeySuccess(result);
    });

  }

  getCharacters(payload) {

    api.handleRequest({
      url: '/api/characters',
      data: {
        apikey: payload.apikey,
        preselectName: payload.preselectName || null
      }
    }, (err, result) => {
      if (err) {
        return this.getCharactersFail(err);
      }
      this.getCharactersSuccess(result);
    });

  }

}

export default alt.createActions(createActions);