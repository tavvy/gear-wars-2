'use strict';

import alt from '../alt';
import {assign} from 'underscore';
import * as buildProfileData from '../utils/buildProfileData';

class CharacterProfileActions {

  constructor() {
    this.generateActions(
      'getProfileSuccess',
      'getProfileFail'
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
          _this.getProfileFail(err);
        }
      }
    );
  }

}

export default alt.createActions(CharacterProfileActions);
