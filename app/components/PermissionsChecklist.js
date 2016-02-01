import React from 'react';

class PermissionsChecklist extends React.Component {

  render() {

    // render permissons
    let permissions = this.props.required.map((perm, index) => {
      if(this.props.supplied && this.props.supplied.indexOf(perm) == -1) {
        return (
          <li key={index} className="label label-warning">
            <i className="fa fa-times-circle"></i> {perm}
          </li>
        )
      } else if(this.props.supplied && this.props.supplied.indexOf(perm) !== -1) {
        return (
          <li key={index} className="label label-info">
            <i className="fa fa-check-circle"></i> {perm}
          </li>
        )
      }
      return (
        <li key={index} className="label label-default">
          <i className="fa fa-minus-circle"></i> {perm}
        </li>
      )
    });

    // if data is passed in via props
    if(this.props.required) {
      return (
        <div>
          <ul className='list-inline'>
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
