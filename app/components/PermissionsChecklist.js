import React from 'react';

class PermissionsChecklist extends React.Component {

  render() {

    // render permissons
    let permissions = this.props.required.map((perm, index) => {
      if(this.props.supplied && this.props.supplied.indexOf(perm) == -1) {
        return (
          <li key={index} className="tag is-inline is-danger">
            x {perm}
          </li>
        )
      } else if(this.props.supplied && this.props.supplied.indexOf(perm) !== -1) {
        return (
          <li key={index} className="tag is-inline is-success">
            + {perm}
          </li>
        )
      }
      return (
        <li key={index} className="tag is-inline">
          ~ {perm}
        </li>
      )
    });

    // if data is passed in via props
    if(this.props.required) {
      return (
        <div>
          <ul className='is-inline'>
            <li>Required permissions:</li>
            {permissions}
          </ul>
        </div>
      );
    }

    // else
    return <div>somethings wrong</div>

  }
}

export default PermissionsChecklist;
