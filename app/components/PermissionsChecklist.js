import React from 'react';

class PermissionsChecklist extends React.Component {

  render() {

    // render permissons
    let permissions = this.props.required.map((perm, index) => {
      if(this.props.supplied && this.props.supplied.indexOf(perm) == -1) {
        return (
          <li key={index} className="text-warning">
            x {perm}
          </li>
        )  
      } else if(this.props.supplied && this.props.supplied.indexOf(perm) !== -1) {
        return (
          <li key={index} className="text-success">
            + {perm}
          </li>
        )
      }
      return (
        <li key={index} className="text-muted">
          ~ {perm}
        </li>
      )
    });

    // if data is passed in via props
    if(this.props.required) {
      return (
        <div>
          <ul className='list-inline'>
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
