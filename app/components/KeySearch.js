import React from 'react';
import {Link} from 'react-router';
import KeySearchStore from '../stores/KeySearchStore';
import KeySearchActions from '../actions/KeySearchActions';

import HelpBlock from './HelpBlock';
import PermissionsChecklist from './PermissionsChecklist';

class KeySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = KeySearchStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    KeySearchStore.listen(this.onChange);
  }

  componentWillUnmount() {
    KeySearchStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let apikey = this.state.apikey.trim();

    if (apikey) {
      KeySearchActions.checkApikey({
        apikey: apikey,
        history: this.props.history
      })
    }

  }

  render() {

    return (
      <section>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label className='control-label'>API KEY</label>
            <input type='text' className='form-control' ref='apikeyField' value={this.state.apikey} onChange={KeySearchActions.updateApikey} autoFocus/>
            <HelpBlock data={this.state.helpBlock} />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>

        <PermissionsChecklist supplied={this.state.apikeyPermissions} required={this.state.requiredPermissions} />

      </section>
    );
  }
}

export default KeySearch;