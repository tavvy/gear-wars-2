import React from 'react';

class LockIndicator extends React.Component {

  render() {

    if(this.props.locked) {
      return (
        <i className='lock-indicator fa fa-lock'></i>
      );
    }

    return <i className='lock-indicator fa fa-unlock'></i>;
  }
}

export default LockIndicator;