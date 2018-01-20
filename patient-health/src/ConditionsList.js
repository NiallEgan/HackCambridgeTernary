import React, { Component } from 'react';
import Condition from './Condition.js';
import './ConditionsList.css';

class ConditionsList extends Component {

  render() {
    return (
      <div className="ConditionsList">
        <h2 className="ConditionsList-heading">Conditions</h2>

        {this.props.conds.map(
          (m) => <Condition type={m.type} date={m.date} status={m.status} />
        )}
      </div>
    );
  }

}

export default ConditionsList;
