import React from 'react';
import {Link} from 'react-router';
// import FooterStore from '../stores/FooterStore'
// import FooterActions from '../actions/FooterActions';

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = FooterStore.getState();
  //   this.onChange = this.onChange.bind(this);
  // }

  // componentDidMount() {
  //   FooterStore.listen(this.onChange);
  //   FooterActions.getTopCharacters();
  // }

  // componentWillUnmount() {
  //   FooterStore.unlisten(this.onChange);
  // }

  // onChange(state) {
  //   this.setState(state);
  // }

  // <div className="toast toast-success"><div className="toast-message">Characters asldlhjasd alskjdhas  data stored</div></div>

  render() {

    return (
      <aside>
        <div className='sticky-sidebar'>
          <p>side bar content</p>
          <div id='toast-container'>
            <br className='fake-element-to-stop-toast-clearing'/>
          </div>
        </div>
      </aside>

    );
  }
}

export default Sidebar;