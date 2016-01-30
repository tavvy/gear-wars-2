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
    this.loading = {
      apikey: false
    };
  }

  onCheckApikeySuccess(result) {
    this.apikey = result.payload.data.apikey;
    this.apikeyValid = apiKeyUtils.validatePermissions(result.response.permissions);
    this.apikeyPermissions = result.response.permissions;
    this.helpBlock = {
      status: 'success',
      text: 'api key exists'
    };
  }

  onCheckApikeyFail(error) {
    toastr.error('invalid key');
    this.apikeyValid = false;
    this.apikeyPermissions = null;
    this.helpBlock = {
      status: error.err.statusCode,
      text: error.err.responseText
    }
  }

  onSignalLoadingApikey(status) {
    this.loading.apikey = status;
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

  onGetCharactersSuccess(result) {
    toastr.success('Characters data stored');
    this.characters = result.response.characters;
    this.activeCharacter = charactersUtils.validateCharacter(result.response.characters, result.payload.data.preselectName);
    // payload.history.pushState(null, '/characters/' + payload.apikey);
  }

  onGetCharactersFail(error) {
    this.characters = null;
    toastr.error(error.err.responseText);
    // payload.history.pushState(null, '/characters');
  }

}

export default alt.createStore(CreateStore);