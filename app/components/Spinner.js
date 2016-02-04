import React from 'react';

class Spinner extends React.Component {
  render() {
    return (
      <div className='m-t-3 text-xs-center'>
        <i className='loading-spinner'></i>
        <small><strong>{this.props.text}</strong></small>
      </div>
    );
  }
}

export default Spinner;