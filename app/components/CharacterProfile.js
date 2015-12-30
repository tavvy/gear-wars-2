import React from 'react';
import {Link} from 'react-router';

// import alt from '../alt';
// import AltContainer from 'alt-container';

import CharacterProfileStore from '../stores/CharacterProfileStore';
import CharacterProfileActions from '../actions/CharacterProfileActions';

import CharacterSummary from './CharacterSummary';
import Item from './Item';
// import ItemContainer from './ItemContainer';

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
    // && this.state.fetching === false
    if(this.state.gw2apidata && this.state.gw2apidata.equipment) {
      var equipmentList = this.state.gw2apidata.equipment.map((item, index) => {
        return (
          <li key={item.id}>
            <Item itemData={this.state.gw2apidata.equipment[index]} />
          </li>
        )
      });
    }

    // wrap below in if (this.state.gw2apidata) for loading div
    return (
      <div>
        <h1>Profile Page</h1>
        <CharacterSummary gw2apidata={this.state.gw2apidata} error={this.state.didFail} />
        <ul>
          {equipmentList}
        </ul>
      </div>
    );

  }

}

export default CharacterProfile;
