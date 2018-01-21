import React, { Component } from 'react';
import { render } from 'react-dom';
import './MedicineRequest.css';
import ReactHover from 'react-hover';
import HoverComponent from 'react-hover';
import TriggerComponent from 'react-hover';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0
}

class MedicineRequest extends Component {

  render() {
    return (
      <div className="MedicineRequest">
        <ReactHover
          options={optionsCursorTrueWithMargin}>
          <ReactHover.Trigger type='trigger'>
            <label className="MedicineRequest-heading">{this.props.type}</label>
          </ReactHover.Trigger>
          <ReactHover.Hover type='hover'>
            <div class='hover-class'>{this.props.type}</div>
          </ReactHover.Hover>
        </ReactHover>


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
