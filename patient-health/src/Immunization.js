import React, { Component } from 'react';
import './Immunization.css';

class Immunization extends Component {

  render() {
    return (
      <div className="Immunization">
        <div className="Immunization-line">
          <label className="Immunization-tag">Type:</label>
          <label className="Immunization-field">{this.props.type}</label>
        </div>

        <div className="Immunization-line">
          <label className="Immunization-tag">Date:</label>
          <label className="Immunization-field">{this.props.date}</label>
        </div>

      </div>
    );
  }

}

export default Immunization;
