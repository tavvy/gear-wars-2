import React from 'react';

import CreateStore from '../stores/CreateStore';

import KeySearch from './KeySearch';
import ListCharacters from './ListCharacters';
import CharacterProfile from './CharacterProfile';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = CreateStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CreateStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CreateStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidUpdate() {
    console.log('Create state change');
    console.log(this.state);
  }

  render() {

    if (this.state.apikeyValid && this.state.activeCharacter) {
      return (
        <div>
          <KeySearch />
          <ListCharacters />
          <hr />
          <CharacterProfile apikey={this.state.apikey} characterName={this.state.activeCharacter} share={true} />
        </div>
      );
    } else if(this.state.apikeyValid) {
      return (
        <div>
          <KeySearch />
          <ListCharacters characterFromParams={this.props.params.character} />
          <hr />
        </div>
      );
    }

    return (
      <div>
        <KeySearch apikeyFromParams={this.props.params.apikey} />
        <hr />
      </div>
    );
  }
}

export default Create;