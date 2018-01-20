import React, { Component } from 'react';
import Chart from 'chart.js';
import './ChartViewer.css';

class ChartViewer extends Component {

  componentDidMount() {
    var series = [];
    var labels = [];

    var i,j,k;
    var val,p;

    for (i = 0; i < this.props.values.length; ++i) {
      val = this.props.values[i];
      labels.push(val.date);
      for (j = 0; j < val.points.length; ++j) {
        p = val.points[j];
        if (!series.includes(p.series)) series.push(p.series);
      }
    }

    var datasets = [];

    for (k = 0; k < series.length; ++k) {
      var currSeries = series[k];
      var data = [];

      for (i = 0; i < this.props.values.length; ++i) {
        val = this.props.values[i];
        for (j = 0; j < val.points.length; ++j) {
          p = val.points[j];
          if (currSeries === p.series) data.push(p.value);
        }
      }

      datasets.push({
        label: currSeries,
        data: data
      });
    }

    /*
    var ctx = this.canvas.getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
              label: "My First dataset",
              //backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 150, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
          }]
      },

      // Configuration options go here
      options: {responsive: false}
    });
    */

    var ctx = this.canvas.getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: labels,
          datasets: datasets
      },

      // Configuration options go here
      options: {responsive: false}
    });

    this.setState({series: series});
  }

  render() {
    return (
      <div className="ChartViewer">
        {this.state != null && <h2>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)} ({this.props.units})</h2>}
        <canvas ref={(c) => this.canvas = c} width="600px" />
      </div>
    );
  }

}

export default ChartViewer;
