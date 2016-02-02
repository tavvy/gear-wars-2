import React from 'react';
import Spinner from './Spinner';

class CharacterSummary extends React.Component {

  render() {
    // if data is passed in via props
    if(this.props.gw2apidata) {
      return (
        <section>
          <h1>{this.props.gw2apidata.name}</h1>
          <h2>{this.props.gw2apidata.level} {this.props.gw2apidata.profession}</h2>
        </section>
      );
    }

    if(this.props.error === true) {
      return <div>Failed to generate character profile</div>
    }

    // else show loading
    return <Spinner text='building character profile' />

  }
}

export default CharacterSummary;