import React from 'react';
import {Link} from 'react-router';
import Spinner from './Spinner';

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
          <li key={index} className='list-inline-item mb5'>
            <a href='/' onClick={this.handleClick.bind(this, character)} className='btn btn-primary btn-sm'>
              {character}
            </a>
          </li>
        )
      });

      return (
        <section className='character-summary container-pa m-b-1 m-t-0 bg-gray-lightest'>
          <small><strong>Characters</strong></small>
          <ul className='list-inline m-b-0'>
            {characterList}
          </ul>
        </section>
      );

    }

    // else loading
    return <Spinner text='loading characters' />;

  }
}

export default ListCharacters;