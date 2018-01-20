import React, { Component } from 'react';
import MedicineRequest from './MedicineRequest.js';
import './MedicineRequestsList.css';

class MedicineRequestsList extends Component {

  render() {
    return (
      <div className="MedicineRequestsList">
        {this.props.medreqs.map(
          (m) => <MedicineRequest type={m.type} status={m.status} date={m.date} />
        )}
      </div>
    );
  }

}

export default MedicineRequestsList;
