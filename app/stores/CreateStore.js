import alt from '../alt';
import * as apiKeyUtils from '../utils/apiKey';
import * as charactersUtils from '../utils/characters';
import CreateActions from '../actions/CreateActions';

class CreateStore {
  constructor() {
    this.bindActions(CreateActions);
    this.apikey = null;
    this.apikeyValid = null;
    this.apikeyPermissions = null;
    this.characters = null;
    this.requiredPermissions = apiKeyUtils.REQUIRED_PERMISSIONS;
    this.helpBlock = null;
    this.activeCharacter = null;
  }

  onCheckApikeySuccess(payload) {
    this.apikey = payload.apikey;
    this.apikeyValid = apiKeyUtils.validatePermissions(payload.permissions);
    this.apikeyPermissions = payload.permissions;
    this.helpBlock = {
      status: 'success',
      text: 'api key exists'
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
    this.setState({apikey: event.target.value});
    // this.apikey = event.target.value;
  }

  onResetApikey(event) {
    this.apikey = null;
    this.apikeyValid = null;
    this.apikeyPermissions = null;
    this.characters = null;
    this.helpBlock = null;
    this.activeCharacter = null;
  }

  setActiveCharacter(character) {
    this.setState({
      activeCharacter: charactersUtils.validateCharacter(this.characters, character)
    });
  }

  onGetCharactersSuccess(payload) {
    toastr.success('Characters data stored');
    this.characters = payload.characters;
    this.activeCharacter = charactersUtils.validateCharacter(payload.characters, payload.preselectName);
    // payload.history.pushState(null, '/characters/' + payload.apikey);
  }

  onGetCharactersFail(payload) {
    this.characters = null;
    // payload.history.pushState(null, '/characters');
    toastr.error(payload.error);
    // TODO actuallly pass error
    // Handle multiple response formats, fallback to HTTP status code number.
    // toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

}

export default alt.createStore(CreateStore);