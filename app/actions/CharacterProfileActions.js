'use strict';

import alt from '../alt';
import {assign} from 'underscore';
import * as profile from '../../models/profile';

class CharacterProfileActions {

  constructor() {
    this.generateActions(
      'getProfileSuccess',
      'getProfileFail',
      'getProfileBusy',
      'cleanProfile'
    );
  }

  getProfile(payload) {
    profile.fetchProfileData(
      {
        apikey: payload.apikey,
        characterName: payload.characterName
      },
      (err, result) => {
        if (result) {
          return this.getProfileSuccess(result);
        }
        if (err.stillBuilding) {
          return this.getProfileBusy(err.text);
        }
        this.getProfileFail(err);
      }
    );
  }

}

export default alt.createActions(CharacterProfileActions);
