import React from 'react';
import {Link} from 'react-router';


class ShareProfile extends React.Component {

  render() {

    if(this.props.apikey && this.props.characterName) {

      return (
        <section>
          <p>
            <a href={'/create/' + this.props.apikey + '/' + this.props.characterName}>bookmark</a>
            <br />
            this.com/create/{this.props.apikey + '/' + this.props.characterName}
          </p>
        </section>
      );

    }

    return (
      <div>loading share wizard</div>
    )

  }
}

export default ShareProfile;