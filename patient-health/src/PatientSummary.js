import React, { Component } from 'react';
import './PatientSummary.css';

class PatientSummary extends Component {

  constructor(props) {
    super();

    /*
    var name = props.data.entry[1].resource.name[0];
    this.name = {
      prefix: name.prefix[0].replace(/[0-9]/g, ''),
      first:  name.given[0].replace(/[0-9]/g, ''),
      last:   name.family.replace(/[0-9]/g, '')
    };

    this.dob = props.data.entry[1].resource.birthDate;
    this.gender = props.data.entry[1].resource.gender;
    */

    this.person = props.data.person;
  }

  render() {
    return (
      <div className="PatientSummary">
        <h2>{this.person.prefix} {this.person.name}</h2>
        <div>
          <p>DOB: {this.person.birthday}</p>
          <p>Gender: {this.person.gender}</p>
        </div>
      </div>
    );
  }

}

export default PatientSummary;
