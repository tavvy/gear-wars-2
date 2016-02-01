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
          <li key={index} className='list-inline-item'>
            <a href='/' onClick={this.handleClick.bind(this, character)} className='btn btn-primary-outline btn-sm'>
              {character}
            </a>
          </li>
        )
      });

      return (
        <section className='character-summary text-md-center'>
          <small><strong>Characters</strong></small>
          <ul className='list-inline'>
            {characterList}
          </ul>
          <hr />
        </section>
      );

    }

    // return (<Spinner text='loading characters' />);
    return (
      <div className='m-t-2 text-xs-center'>
        <i className='loading-spinner'></i>
        <small><strong>loading characters</strong></small>
      </div>
    );

  }
}

export default ListCharacters;