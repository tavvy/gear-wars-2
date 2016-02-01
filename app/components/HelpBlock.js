import React from 'react';

class HelpBlock extends React.Component {

  render() {

    if(this.props.data && this.props.data.status == 403) {
      return (
        <span>
          That key is invalid. details: {this.props.data.text}
        </span>
      );
    }
    // if data is passed in via props
    if(this.props.data) {
      return (
        <span>
          {this.props.data.text}
        </span>
      );
    }

    // else show no data
    return <span>Please enter a valid api key</span>;
  }
}

export default HelpBlock;
