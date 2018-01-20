import React, { Component } from 'react';
import Immunization from './Immunization.js';
import './ImmunizationsList.css';

class ImmunizationsList extends Component {

  render() {
    return (
      <div className="ImmunizationsList">
        <h2 className="ImmunizationsList-heading">Immunizations</h2>

        {this.props.immuns.map(
          (m) => <Immunization type={m.type} date={m.date} />
        )}
      </div>
    );
  }

}

export default ImmunizationsList;
