import React from 'react';

class Item extends React.Component {

  render() {

    // upgrades
    if(this.props.itemData && this.props.itemData.upgrades) {
      var upgradeList = this.props.itemData.upgrades.map((item, index) => {
        if (item && item.id) {
          return (
            <li key={this.props.itemData.id + item.id + index}>
              <small>{item.name}</small>
            </li>
          )
        }
      });
    }

    // infusions
    if(this.props.itemData && this.props.itemData.infusions) {
      var infusionList = this.props.itemData.infusions.map((item, index) => {
        return (
          <li key={this.props.itemData.id + item.id + index}>
            <small>{item.name}</small>
          </li>
        )
      });
    }

    // if data is passed in via props
    if(this.props.itemData.data) {
      return (
        <div>
            <img src={this.props.itemData.data.icon} style={{width: '30px', height:'30px'}} />
            <small><b>{this.props.itemData.data.name}</b></small>
            <small> - {this.props.itemData.id}</small>
            <ul>
              {upgradeList}
              {infusionList}
            </ul>
        </div>
      );
    }

    // else show no data
    return <div>no item data</div>
  }
}

export default Item;
