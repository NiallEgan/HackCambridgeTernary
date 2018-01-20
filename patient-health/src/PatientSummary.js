import React, { Component } from 'react';
import LocaleCode from 'locale-code';
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
        <h2 className="PatientSummary-heading">{this.person.prefix} {this.person.name}</h2>
        <h4 className="PatientSummary-heading">{this.props.data.provider}</h4>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">DOB:</label>
          <label className="PatientSummary-field">{this.person.birthday}</label>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Gender:</label>
          <label className="PatientSummary-field">{this.person.gender}</label>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Address:</label>
          <div className="PatientSummary-address">
            <label>{this.person.address.house} {this.person.address.street}</label><br/>
            <label>{this.person.address.city}</label><br/>
            <label>{this.person.address.country}</label>
          </div>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Phone:</label>
          <label className="PatientSummary-field">{this.person.phone}</label>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Languages:</label>
          <label className="PatientSummary-field">{this.person.languages.map(
            (l) => LocaleCode.getLanguageNativeName(l + (l.includes("-") ? "" : "-" + l.toUpperCase())) + (this.person.languages.indexOf(l) !== this.person.languages.length-1 ? ", " : "")
          )}</label>
        </div>
      </div>
    );
  }

}

export default PatientSummary;
