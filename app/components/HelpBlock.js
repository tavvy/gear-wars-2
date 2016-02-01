import React from 'react';

class HelpBlock extends React.Component {

  render() {

    if(this.props.data && this.props.data.status == 403) {
      return (
        <small><strong>GW2-API Key is invalid. details: {this.props.data.text}</strong></small>
      );
    }
    // if data is passed in via props
    if(this.props.data) {
      return (
        <small><strong>{this.props.data.text}</strong></small>
      );
    }

    // else show no data
    return <small><strong>Please enter a valid <a href='http://www.gw2.com' className='abbr'>GW2-API Key</a></strong></small>
  }
}

export default HelpBlock;
