import React, { Component } from 'react';
import logo from './logo.svg';
import PatientSummary from './PatientSummary.js';
import ChartViewer from './ChartViewer.js';
import './App.css';

class App extends Component {

  componentDidMount() {
    /*
    var client = new XMLHttpRequest();
    client.open('GET', '/Abbott701_Veronika555_74.json');
    client.app = this;
    client.onreadystatechange = function() {
      if (client.responseText === "") return;
      var fileData = JSON.parse(client.responseText);
      this.app.setState({data: fileData});
    }
    client.send();
    */

    this.setState({data: {
      provider: "Chelsea and Westminster Hospital",
      person: {
        name: "Matteo Pozzi",
        prefix: "Mr.",
        birthday: "19/07/1998",
        gender: "M",

        address: {
          house: "26",
          street: "St Ann's Villas",
          city: "London",
          country: "UK"
        },

        phone: "+44 7807207272",

        languages: [
          "en-US",
          "it",
          "fr"
        ]
      }
    }});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">myHealth</h1>
        </header>
        {this.state != null && <PatientSummary data={this.state.data} />}
        {this.state != null && <ChartViewer />}
      </div>
    );
  }
}

export default App;
