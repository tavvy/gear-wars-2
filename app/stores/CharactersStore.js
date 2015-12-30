import alt from '../alt';
import CharactersActions from '../actions/CharactersActions';

class CharactersStore {
  constructor() {
    this.bindActions(CharactersActions);
    this.apikey = '';
    this.characters = [];
  }

  onGetCharactersSuccess(payload) {
    this.characters = payload.characters;
    this.apikey = payload.apikey;
    payload.history.pushState(null, '/characters/' + payload.apikey);
    toastr.success('Characters data stored');
  }

  onGetCharactersFail(payload) {
    // clear out characters on fail
    this.characters = [];
    // set api key for search field
    this.apikey = payload.apikey;
    payload.history.pushState(null, '/characters');
    toastr.error(payload.error);
    // TODO actuallly pass error
    // Handle multiple response formats, fallback to HTTP status code number.
    // toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onUpdateApikey(event) {
    this.apikey = event.target.value;
  }

}

export default alt.createStore(CharactersStore);