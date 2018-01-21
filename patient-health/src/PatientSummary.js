import React, { Component } from 'react';
import LocaleCode from 'locale-code';
import './PatientSummary.css';

class PatientSummary extends Component {

  constructor(props) {
    super();

    this.person = props.data.person;
    this.address = this.person.address.split(",");
  }

  render() {
    return (
      <div className="PatientSummary">
        <h2 className="PatientSummary-heading">{this.person.prefix} {this.person.name}</h2>
        <h4 className="PatientSummary-heading">{this.props.data.provider}</h4>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Date of Birth:</label>
          <label className="PatientSummary-field">{this.person.birthday}</label>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Gender:</label>
          <label className="PatientSummary-field">{this.person.gender}</label>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Address:</label>
          <div className="PatientSummary-address">
            <label>{this.address[0]}, {this.address[1]}</label><br/>
            <label>{this.address[2]}</label><br/>
            <label>{this.address[3]}</label>
          </div>
        </div>

        <div className="PatientSummary-line">
          <label className="PatientSummary-tag">Phone:</label>
          <label className="PatientSummary-field">{this.person.phone[0].value.split(" ")[0]}</label>
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
