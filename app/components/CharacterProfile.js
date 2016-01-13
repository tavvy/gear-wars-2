import React from 'react';
import {Link} from 'react-router';

import CharacterProfileStore from '../stores/CharacterProfileStore';
import CharacterProfileActions from '../actions/CharacterProfileActions';

import ShareProfile from './ShareProfile';
import CharacterSummary from './CharacterSummary';
import Equipment from './Equipment';

class CharacterProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = CharacterProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterProfileStore.listen(this.onChange);
    // build initial profile
    if(this.props.characterName && this.props.apikey) {
      CharacterProfileActions.getProfile({
        characterName: this.props.characterName,
        apikey: this.props.apikey
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    // when we recieve new props aka characterName
    let shouldUpdateProfile = false;
    // is the new request character different to our current request?
    if(this.props.characterName && this.props.characterName !== nextProps.characterName) {
      shouldUpdateProfile = true;
    }
    // is the new request character different to what we have loaded?
    if(this.state.loadedCharacter && this.state.loadedCharacter !== nextProps.characterName) {
      shouldUpdateProfile = true;
    }
    // if we are not busy fetching a profile
    if(!this.state.busy && shouldUpdateProfile) {
        // clear old profile
        CharacterProfileActions.cleanProfile();
        // load new one
        return CharacterProfileActions.getProfile({
          characterName: nextProps.characterName,
          apikey: nextProps.apikey
        });
    }
  }

  componentDidUpdate() {
    // props at time of change / render call - https://github.com/goatslacker/alt/issues/307
    console.log('profile updated');
    console.log(this.state);
    console.log(this.props);
  }

  componentWillUnmount() {
    CharacterProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let shareProfile = null;
    if(this.props.share && this.state.gw2apidata && this.state.gw2apidata.name) {
      shareProfile = <ShareProfile apikey={this.props.apikey} characterName={this.state.gw2apidata.name}/>;
    }

    return (
      <div>
        {shareProfile}
        <h1>Profile Page</h1>
        <CharacterSummary gw2apidata={this.state.gw2apidata} error={this.state.didFail} />
        <Equipment data={this.state.gw2apidata} />
      </div>
    );

  }

}

export default CharacterProfile;
