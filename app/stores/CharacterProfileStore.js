import alt from '../alt';
import CharacterProfileActions from '../actions/CharacterProfileActions';

class CharacterProfileStore {

  constructor() {
    this.bindActions(CharacterProfileActions);
    // set this dynamically by grabbing from db / cookie
    this.apikey = '7D549F4F-47ED-6C4B-B17F-B791BFEA7CED49A8F2F1-B0F2-4770-9AD1-3A4C575CBF7E';
    this.gw2apidata = null;
    this.didFail = null;
  }

  onGetProfileSuccess(data) {
    this.didFail = false;
    this.gw2apidata = data;
    toastr.success('Profile data stored');
  }

  onGetProfileFail(payload) {
    this.didFail = true;
    toastr.error(payload);
    // Handle multiple response formats, fallback to HTTP status code number.
    // toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

}

export default alt.createStore(CharacterProfileStore);