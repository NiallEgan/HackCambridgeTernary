import React, { Component } from 'react';
import './MedicineRequest.css';

class MedicineRequest extends Component {

  render() {
    return (
      <div className="MedicineRequest">
        <label className="MedicineRequest-heading">{this.props.type}</label>

        <div className="MedicineRequest-line">
          <label className="MedicineRequest-tag">Status:</label>
          <label className="MedicineRequest-field">{this.props.status}</label>
        </div>

        <div className="MedicineRequest-line">
          <label className="MedicineRequest-tag">Date:</label>
          <label className="MedicineRequest-field">{this.props.date}</label>
        </div>

      </div>
    );
  }

}

export default MedicineRequest;
