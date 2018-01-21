import React, { Component } from 'react';
import './Condition.css';

class Condition extends Component {
  //var gaussian = require('guassian');


  render() {

    return (
      <div className="Condition">
        <label className="Condition-heading">{this.props.type}</label>

        <div className="Condition-line">
          <label className="Condition-tag">Date:</label>
          <label className="Condition-field">{this.props.date}</label>
        </div>

        <div className="Condition-line">
          <label className="Condition-tag">Status:</label>
          <label className="Condition-field">{this.props.status}</label>
        </div>

      </div>
    );
  }

}

export default Condition;
