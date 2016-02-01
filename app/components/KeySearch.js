import React from 'react';
import {Link} from 'react-router';

import CreateStore from '../stores/CreateStore';
import CreateActions from '../actions/CreateActions';

import HelpBlock from './HelpBlock';
import PermissionsChecklist from './PermissionsChecklist';
import LockIndicator from './LockIndicator';

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
      <fieldset disabled>
        <div className='input-group'>
          <input type='text' className='form-control' ref='apikeyField' value={this.state.apikey} autoFocus />
          <a type='submit' className='btn btn-primary is-loading'>Submit</a>
        </div>
      </fieldset>
      )
  }

  renderForm() {
    return (
      <fieldset>
        <div className='input-group'>
          <input type='text' className='form-control' ref='apikeyField' value={this.state.apikey} onChange={CreateActions.updateApikey} placeholder='API KEY' autoFocus />
          <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
      </fieldset>
    )
  }

  renderDisplay() {
    return (
      <fieldset>
        <div className='input-group'>
          <input type='text' className='form-control' ref='apikeyField' value={this.state.apikey} onChange={CreateActions.updateApikey} disabled/>
          <button type='reset' onClick={this.handleReset.bind(this)} className='btn btn-warning'>Reset</button>
        </div>
      </fieldset>
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
        <form onSubmit={this.handleSubmit.bind(this)} className={this.state.apikeyValid ? 'key-search-form is-locked' : 'key-search-form'}>
          <div className='form-group pa10'>
            <HelpBlock data={this.state.helpBlock} />
            {formgroup}
            <LockIndicator locked={this.state.apikeyValid} />
            <PermissionsChecklist supplied={this.state.apikeyPermissions} required={this.state.requiredPermissions} />
          </div>
        </form>
      </section>
    );
  }
}

export default KeySearch;