import React, { Component } from 'react';
import MedicineRequest from './MedicineRequest.js';
import './MedicineRequestsList.css';

class MedicineRequestsList extends Component {

  genMedReqs() {
    var medReqs = [];

    for (var i = 0; i < this.props.medreqs.length; ++i) {
      var m = this.props.medreqs[i];
      var key = m.type;
      var e = this.props.exp[key];

      if (e != null) e = e[0];

      medReqs.push(<MedicineRequest type={m.type} status={m.status} date={m.date} exp={e} />);
    }

    return medReqs;
  }

  render() {
    return (
      <div className="MedicineRequestsList">
        <h2 className="MedicineRequestsList-heading">Medicine Requests</h2>

        {this.genMedReqs()}
      </div>
    );
  }

}

export default MedicineRequestsList;
