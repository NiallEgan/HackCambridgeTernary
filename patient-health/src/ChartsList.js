import React, { Component } from 'react';
import ChartViewer from './ChartViewer.js';
import './ChartsList.css';

class ChartsList extends Component {

  generateCharts() {
    var charts = [];

    for (var item in this.props.observs) {
      charts.push(<ChartViewer units={this.props.observs[item].units} values={this.props.observs[item].values} />);
    }

    return charts;
  }

  render() {
    return (
      <div className="ChartsList">
        {this.generateCharts()}
      </div>
    );
  }

}

export default ChartsList;
