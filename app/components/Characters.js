import React from 'react';
import {Link} from 'react-router';
import CharactersStore from '../stores/CharactersStore';
import CharactersActions from '../actions/CharactersActions';

class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = CharactersStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharactersStore.listen(this.onChange);
    // if we land on the page with :apikey value then kick off the query
    if(this.props.params.apikey) {
      CharactersActions.getCharacters({
        apikey: this.props.params.apikey,
        history: this.props.history
      });
    }
  }

  componentWillUnmount() {
    CharactersStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let apikey = this.state.apikey.trim();

    if (apikey) {
      CharactersActions.getCharacters({
        apikey: apikey,
        history: this.props.history
      })
    }

  }

  render() {
	let characterList = this.state.characters.map((character) => {
		return (
			<li key={character}>
				<Link to={'/profilepage/' + character}>
					{character}
				</Link>
			</li>
		)
	});

    return (
      <section>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label className='control-label'>API KEY</label>
            <input type='text' className='form-control' ref='apikeyField' value={this.state.apikey} onChange={CharactersActions.updateApikey} autoFocus/>
            <span className='help-block'>{this.state.helpBlock}</span>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>

        <div className='alert alert-info'>
          Your characters are:
          <ul className='list-inline'>
          	{characterList}
          </ul>
          <small>Active API KEY: {this.state.apikey}</small>
        </div>

      </section>
    );
  }
}

export default Characters;