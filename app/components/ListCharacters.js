import React from 'react';
import {Link} from 'react-router';

import CreateStore from '../stores/CreateStore';
import CreateActions from '../actions/CreateActions';


class ListCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.state = CreateStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CreateStore.listen(this.onChange);
    // pass character from params
    CreateActions.getCharacters({
      apikey: this.state.apikey,
      preselectName: this.props.characterFromParams
    });
  }

  componentWillUnmount() {
     CreateStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(character, event) {
    event.preventDefault();
    CreateActions.setActiveCharacter(character);
  }

  render() {

    if(this.state.characters) {

      let characterList = this.state.characters.map((character, index) => {
        return (
          <li key={index}>
            <a href='/' onClick={this.handleClick.bind(this, character)}>
              {character}
            </a>
          </li>
        )
      });

      return (
        <section>
          <small>character list</small>
          <ul>
            {characterList}
          </ul>
        </section>
      );

    }

    return (
      <div>loading characters</div>
    )

  }
}

export default ListCharacters;