import React from 'react';
import Item from './Item';

class Equipment extends React.Component {

  render() {
    if(this.props.data && this.props.data.equipment) {

      var equipmentList = this.props.data.equipment.map((item, index) => {
        return (
          <li key={index}>
            <Item itemData={this.props.data.equipment[index]} />
          </li>
        )
      });

      return (
        <ul>
          {equipmentList}
        </ul>
      );

    }
    else {
      // else show no data
      return <div>loading equipment</div>
    }


  }
}

export default Equipment;
