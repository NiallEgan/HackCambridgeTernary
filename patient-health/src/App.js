import React, { Component } from 'react';
import logo from './logo.svg';
import PatientSummary from './PatientSummary.js';
import ChartViewer from './ChartViewer.js';
import MedicineRequestsList from './MedicineRequestsList.js';
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
        name: "John Smith",
        prefix: "Mr.",
        birthday: "15/05/1945",
        gender: "M",

        address: {
          house: "100",
          street: "Nice Road",
          city: "London",
          country: "UK"
        },

        phone: "+44 1236547890",

        languages: [
          "en-US",
          "fr",
          "de"
        ]
      },

      medreqs: [
        {
          type: "Naproxen Sodium 20mg",
          status: "active",
          date: "10/01/18"
        },
        {
          type: "Penicillin V Potassium 250mg",
          status: "active",
          date: "15/01/18"
        }
      ]
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
        {this.state != null && this.state.data.medreqs.length > 0 && <MedicineRequestsList medreqs={this.state.data.medreqs}/>}
      </div>
    );
  }
}

export default App;
