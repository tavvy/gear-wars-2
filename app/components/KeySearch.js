import React from 'react';
import {Link} from 'react-router';

import CreateStore from '../stores/CreateStore';
import CreateActions from '../actions/CreateActions';

import HelpBlock from './HelpBlock';
import PermissionsChecklist from './PermissionsChecklist';

class KeySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = CreateStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CreateStore.listen(this.onChange);
    // if apikey is passed in props then triggerSearch
    if(this.props.apikeyFromParams) {
      CreateActions.updateApikey({
        target: {
          value: this.props.apikeyFromParams
        }
      });
      this.checkApiKey(this.props.apikeyFromParams);
    }
  }

  componentWillUnmount() {
    CreateStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.checkApiKey();
  }

  handleReset(event) {
    event.preventDefault();
    CreateActions.resetApikey();
  }

  checkApiKey(passedKey) {
    let apikey = this.state.apikey ? this.state.apikey.trim() : passedKey;
    if (apikey) {
      CreateActions.checkApikey({
        apikey: apikey
        // history: this.props.history
      })
    }
  }

  renderLoading() {
    return (
      <div>
        <div>API KEY</div>
        <input type='text' ref='apikeyField' value={this.state.apikey} autoFocus />
        <a type='submit'>Submit</a>
      </div>
    )
  }

  renderForm() {
    return (
      <div>
        <div>API KEY</div>
        <input type='text' ref='apikeyField' value={this.state.apikey} onChange={CreateActions.updateApikey} autoFocus />
        <button type='submit'>Submit</button>
      </div>
    )
  }

  renderDisplay() {
    return (
      <div>
        <div>API KEY</div>
        <input type='text' ref='apikeyField' value={this.state.apikey} onChange={CreateActions.updateApikey} disabled/>
        <button type='reset' onClick={this.handleReset.bind(this)}>Reset</button>
      </div>
    )
  }

  render() {
    let formgroup;
    if(this.state.apikeyValid == true) {
      formgroup = this.renderDisplay();
    }
    else if(this.state.loading.apikey == true) {
      formgroup = this.renderLoading();
    }
    else {
      formgroup = this.renderForm();
    }

    return (
      <section>
        <label>Please enter your api key:</label>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {formgroup}
        </form>
        <HelpBlock data={this.state.helpBlock} />
        <PermissionsChecklist supplied={this.state.apikeyPermissions} required={this.state.requiredPermissions} />
      </section>
    );
  }
}

export default KeySearch;