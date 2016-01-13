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

  renderForm() {
    return (
      <div className='form-group'>
        <div className='input-group'>
          <div className='input-group-addon'>API KEY</div>
          <input type='text' className='form-control' ref='apikeyField' value={this.state.apikey} onChange={CreateActions.updateApikey} autoFocus />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
    )
  }

  renderDisplay() {
    return (
      <div className='form-group'>
        <div className='input-group'>
          <div className='input-group-addon'>API KEY</div>
          <input type='text' className='form-control disabled' ref='apikeyField' value={this.state.apikey} onChange={CreateActions.updateApikey} disabled/>
        </div>
        <button type='reset' className='btn btn-warning' onClick={this.handleReset.bind(this)}>Reset</button>
      </div>
    )
  }

  render() {
    let formgroup;
    if(this.state.apikeyValid == true) {
      formgroup = this.renderDisplay();
    }
    else {
      formgroup = this.renderForm();
    }

    return (
      <section>
        <label className='sr-only'>Please enter your api key:</label>
        <form onSubmit={this.handleSubmit.bind(this)} className='form-inline'>
          {formgroup}
        </form>
        <HelpBlock data={this.state.helpBlock} />
        <PermissionsChecklist supplied={this.state.apikeyPermissions} required={this.state.requiredPermissions} />
      </section>
    );
  }
}

export default KeySearch;