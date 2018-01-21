import React, { Component } from 'react';
import logo from './logo.svg';
import PatientSummary from './PatientSummary.js';
import MedicineRequestsList from './MedicineRequestsList.js';
import ImmunizationsList from './ImmunizationsList.js';
import ConditionsList from './ConditionsList.js';
import ChartsList from './ChartsList.js';
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

    /*
    this.setState({"data": {"provider": "MASS GENERAL WALTHAM", "person": {"prefix": "Mr.", "name": "Irvin Barrows", "birthday": "1940-03-21", "gender": "male", "address": "Suite 856,196 Runolfsson Squares,Waltham,US", "phone": [{"system": "phone", "value": "317-853-9236", "use": "home"}], "languages": ["en-US"]}, "conds": [{"date": "1961-01-10", "type": "Chronic sinusitis (disorder)", "status": "active"}, {"date": "1975-12-24", "type": "Prediabetes", "status": "active"}, {"date": "1996-05-29", "type": "Coronary Heart Disease", "status": "active"}, {"date": "2010-02-04", "type": "Myocardial Infarction", "status": "active"}, {"date": "2010-02-04", "type": "History of myocardial infarction (situation)", "status": "active"}], "immuns": [{"date": "2008-05-20T11:43:40-04:00", "type": "Influenza, seasonal, injectable, preservative free"}, {"date": "2009-05-11T07:21:55-04:00", "type": "Influenza, seasonal, injectable, preservative free"}], "medreqs": [{"type": "Simvastatin 20 MG Oral Tablet", "code": "312961", "date": "1996-05-29", "status": "active", "dosage": ""}, {"type": "Amlodipine 5 MG Oral Tablet", "code": "197361", "date": "1996-05-29", "status": "active", "dosage": ""}, {"type": "Nitroglycerin 0.4 MG/ACTUAT [Nitrolingual]", "code": "564666", "date": "1996-05-29", "status": "stopped", "dosage": ""}, {"type": "Clopidogrel 75 MG Oral Tablet", "code": "309362", "date": "1997-06-22", "status": "stopped", "dosage": ""}, {"type": "Nitroglycerin 0.4 MG/ACTUAT [Nitrolingual]", "code": "564666", "date": "2010-02-04", "status": "active", "dosage": ""}, {"type": "Atorvastatin 80 MG Oral Tablet", "code": "259255", "date": "2010-02-04", "status": "stopped", "dosage": ""}, {"type": "Captopril 25 MG Oral Tablet", "code": "833036", "date": "2010-02-04", "status": "stopped", "dosage": ""}, {"type": "Clopidogrel 75 MG Oral Tablet", "code": "309362", "date": "2010-02-04", "status": "active", "dosage": ""}], "observs": {"Hemoglobin A1c/Hemoglobin.total in Blood": {"units": "%", "values": [{"date": "2008-05-20", "value": 6.0}, {"date": "2008-05-20", "value": 6.0}, {"date": "2009-05-11", "value": 6.1}, {"date": "2009-05-11", "value": 6.1}]}, "Body Height": {"units": "cm", "values": [{"date": "2008-05-20", "value": 174.9148752699769}, {"date": "2009-05-11", "value": 174.9148752699769}]}, "Body Weight": {"units": "kg", "values": [{"date": "2008-05-20", "value": 101.25085279249322}, {"date": "2009-05-11", "value": 99.39765043255035}]}, "Body Mass Index": {"units": "kg/m2", "values": [{"date": "2008-05-20", "value": 33.09369045334334}, {"date": "2009-05-11", "value": 32.487974021768736}]}, "Systolic Blood Pressure": {"units": "mmHg", "values": [{"date": "2008-05-20", "value": 109}, {"date": "2009-05-11", "value": 130}]}, "Diastolic Blood Pressure": {"units": "mmHg", "values": [{"date": "2008-05-20", "value": 89}, {"date": "2009-05-11", "value": 79}]}, "Glucose": {"units": "mg/dL", "values": [{"date": "2008-05-20", "value": 91}, {"date": "2009-05-11", "value": 83}]}, "Urea Nitrogen": {"units": "mg/dL", "values": [{"date": "2008-05-20", "value": 11}, {"date": "2009-05-11", "value": 7}]}, "Creatinine": {"units": "mg/dL", "values": [{"date": "2008-05-20", "value": 1.0}, {"date": "2009-05-11", "value": 1.0}]}, "Calcium": {"units": "mg/dL", "values": [{"date": "2008-05-20", "value": 9.640969750867526}, {"date": "2009-05-11", "value": 9.96097203082879}]}, "Sodium": {"units": "mmol/L", "values": [{"date": "2008-05-20", "value": 142}, {"date": "2009-05-11", "value": 142}]}, "Potassium": {"units": "mmol/L", "values": [{"date": "2008-05-20", "value": 3.84913299378357}, {"date": "2009-05-11", "value": 4.93694322014175}]}, "Chloride": {"units": "mmol/L", "values": [{"date": "2008-05-20", "value": 101}, {"date": "2009-05-11", "value": 111}]}, "Carbon Dioxide": {"units": "mmol/L", "values": [{"date": "2008-05-20", "value": 27}, {"date": "2009-05-11", "value": 28}]}, "Total Cholesterol": {"units": "mg/dL", "values": [{"date": "2009-05-11", "value": 191}]}, "Triglycerides": {"units": "mg/dL", "values": [{"date": "2009-05-11", "value": 106}]}, "Low Density Lipoprotein Cholesterol": {"units": "mg/dL", "values": [{"date": "2009-05-11", "value": 91}]}, "High Density Lipoprotein Cholesterol": {"units": "mg/dL", "values": [{"date": "2009-05-11", "value": 78}]}, "Cause of Death [US Standard Certificate of Death]": {"units": "N/A", "values": [{"date": "2010-02-04", "value": "Myocardial Infarction"}]}, "Quality adjusted life years": {"units": "years", "values": [{"date": "2017-10-31", "value": 66.78166473091383}]}, "Disability rating scale": {"units": "years", "values": [{"date": "2017-10-31", "value": 23.715675269086184}]}}}, "explanations": {"Simvastatin 20 MG Oral Tablet": ["Simvastatin, marketed under the trade name Zocor among others, is a lipid-lowering medication. It is used along with exercise, diet, and weight loss to decrease elevated lipid (fat) levels. It is also used to decrease the risk of heart problems in those at high risk. It is taken by mouth."], "Amlodipine 5 MG Oral Tablet": ["Amlodipine, sold under the brand name Norvasc among others, is a medication used to treat high blood pressure and coronary artery disease. While not typically recommended in heart failure, amlodipine may be used if other medications are not sufficient for high blood pressure or heart related chest pain. Amlodipine is taken by mouth and has an effect for at least a day."], "Nitroglycerin 0.4 MG/ACTUAT [Nitrolingual]": ["Nitroglycerin (NG), also known as nitroglycerine, trinitroglycerin (TNG), trinitroglycerine, nitro, glyceryl trinitrate (GTN), or 1,2,3-trinitroxypropane, is a heavy, colorless, oily, explosive liquid most commonly produced by nitrating glycerol with white fuming nitric acid under conditions appropriate to the formation of the nitric acid ester. Chemically, the substance is an organic nitrate compound rather than a nitro compound, yet the traditional name is often retained. Invented in 1847, nitroglycerin has been used as an active ingredient in the manufacture of explosives, mostly dynamite, and as such it is employed in the construction, demolition, and mining industries. Since the 1880s, it has been used by the military as an active ingredient, and a gelatinizer for nitrocellulose, in some solid propellants, such as cordite and ballistite."], "Clopidogrel 75 MG Oral Tablet": ["Clopidogrel, sold as the brandname Plavix among others, is a medication that is used to reduce the risk of heart disease and stroke in those at high risk. It is also used together with aspirin in heart attacks and following the placement of a coronary artery stent (dual antiplatelet therapy). It is taken by mouth. Onset of effects is about 2 hours and lasts for 5 days."]}});
    */

    var xmlhttp = new XMLHttpRequest();

    const app = this;

    xmlhttp.onreadystatechange = function() {
      console.log("Data received:");
      console.log(this.responseText);
      if (this.responseText !== null && this.responseText !== "") app.setState(JSON.parse(this.responseText));
    };

    xmlhttp.open("GET", "http://127.0.0.1:5000/record/11", true);
    xmlhttp.send();

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">myHealth</h1>
        </header>
        {this.state != null && <PatientSummary data={this.state.data} />}
        {this.state != null && this.state.data.medreqs.length > 0 && <MedicineRequestsList medreqs={this.state.data.medreqs} exp={this.state.explanations}/>}
        {this.state != null && this.state.data.immuns.length > 0 && <ImmunizationsList immuns={this.state.data.immuns}/>}
        {this.state != null && this.state.data.conds.length > 0 && <ConditionsList conds={this.state.data.conds}/>}
        {this.state != null && <ChartsList observs={this.state.data.observs}/>}
      </div>
    );
  }
}

export default App;
