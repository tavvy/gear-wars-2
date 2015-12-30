import React from 'react';
import {Link} from 'react-router';

// import alt from '../alt';
// import AltContainer from 'alt-container';

import CharacterProfileStore from '../stores/CharacterProfileStore';
import CharacterProfileActions from '../actions/CharacterProfileActions';

import CharacterSummary from './CharacterSummary';
// import Item from './Item';
// import ItemContainer from './ItemContainer';
import Equipment from './Equipment';

class CharacterProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = CharacterProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterProfileStore.listen(this.onChange);
    if(this.props.params.characterName) {
      CharacterProfileActions.getProfile({
        characterName: this.props.params.characterName,
        apikey: this.state.apikey
      })
    }
  }

  componentDidUpdate() {
    // props at time of change / render call - https://github.com/goatslacker/alt/issues/307
    console.log('profile componentDidUpdate');
    console.log(this.state)
  }

  componentWillUnmount() {
    CharacterProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    return (
      <div>
        <h1>Profile Page</h1>
        <CharacterSummary gw2apidata={this.state.gw2apidata} error={this.state.didFail} />
        <Equipment data={this.state.gw2apidata} />
      </div>
    );

  }

}

export default CharacterProfile;
