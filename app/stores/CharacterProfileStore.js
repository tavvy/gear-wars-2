import alt from '../alt';
import CharacterProfileActions from '../actions/CharacterProfileActions';

class CharacterProfileStore {

  constructor() {
    this.bindActions(CharacterProfileActions);
    this.gw2apidata = null;
    this.didFail = null;
    this.busy = false;
    this.loadedCharacter = null;
  }

  onGetProfileSuccess(data) {
    this.didFail = false;
    this.gw2apidata = data;
    this.busy = false;
    this.loadedCharacter = data.name;
    toastr.success('Profile data stored');
  }

  onGetProfileFail(error) {
    this.didFail = true;
    this.busy = false;
    this.loadedCharacter = null;
    toastr.error('There was an error building the profile data:' + error.err.responseText);
  }

  onGetProfileBusy(payload) {
    this.busy = true;
    toastr.error(payload);
  }

  onCleanProfile() {
    this.gw2apidata = null;
    this.didFail = null;
    this.loadedCharacter = null;
  }

}

export default alt.createStore(CharacterProfileStore);