import React, { Component } from 'react';
import Chart from 'chart.js';
import './ChartViewer.css';

class ChartViewer extends Component {

  componentDidMount() {
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
  }

  render() {
    return (
      <div className="ChartViewer">
        <canvas ref={(c) => this.canvas = c} width="600px" />
      </div>
    );
  }

}

export default ChartViewer;
