import alt from '../alt';
import * as apiKeyUtils from '../utils/apiKey';
import KeySearchActions from '../actions/KeySearchActions';

class KeySearchStore {
  constructor() {
    this.bindActions(KeySearchActions);
    this.apikey = '';
    this.apikeyValid = null;
    this.apikeyPermissions = null;
    this.characters = [];
    this.requiredPermissions = apiKeyUtils.REQUIRED_PERMISSIONS;
    this.helpBlock = null;
  }

  onCheckApikeySuccess(payload) {
    this.apikeyValid = apiKeyUtils.validatePermissions(payload.permissions);
    this.apikeyPermissions = payload.permissions;
    this.helpBlock = {
      text: 'valid api key'
    };
  }

  onCheckApikeyFail(payload) {
    toastr.error('invalid key');
    this.apikeyValid = false;
    this.apikeyPermissions = null;
    this.helpBlock = {
      status: payload.statusCode,
      text: payload.responseText
    }
  }

  onUpdateApikey(event) {
    this.apikey = event.target.value;
  }

}

export default alt.createStore(KeySearchStore);