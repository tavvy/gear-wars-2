import React from 'react';
import {Link} from 'react-router';


class ShareProfile extends React.Component {

  render() {

    if(this.props.apikey && this.props.characterName) {
      return (
        <div className='pull-right'>
          <a href={'/create/' + this.props.apikey + '/' + this.props.characterName} className='p-r-1'>
            <i className='fa fa-bookmark'></i> Bookmark
          </a>
          <a href='/' className='btn btn-primary-outline'>
            <i className='fa fa-share'></i> Share Profile
          </a>
        </div>
      );
    }

    return (
      <a className='pull-right' href='/'>
        <i className='fa fa-bookmark-o'></i> Loading...
      </a>
    )

  }
}

export default ShareProfile;