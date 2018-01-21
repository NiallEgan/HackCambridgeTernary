import React, { Component } from 'react';
import MedicineRequest from './MedicineRequest.js';
import './MedicineRequestsList.css';

class MedicineRequestsList extends Component {

  render() {
    return (
      <div className="MedicineRequestsList">
        <h2 className="MedicineRequestsList-heading">Medicine Requests</h2>

        {this.props.medreqs.map(
          (m) => <MedicineRequest type={m.type} status={m.status} date={m.date} exp={this.props.exp[this.props.medreqs.indexOf(m)]} />
        )}
      </div>
    );
  }

}

export default MedicineRequestsList;
