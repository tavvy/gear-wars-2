'use strict';

import alt from '../alt';
import {assign} from 'underscore';
import * as buildProfileData from '../utils/buildProfileData';

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
    let _this = this;

    buildProfileData.fetchProfileData(
      {
        apikey: payload.apikey,
        characterName: payload.characterName
      },
      function (err, result) {
        if(result) {
          _this.getProfileSuccess(result);
        }
        if(err) {
          if (err.stillBuilding) {
            _this.getProfileBusy(err.text);
          } else {
            _this.getProfileFail(err);
          }
        }
      }
    );

  }

}

export default alt.createActions(CharacterProfileActions);
