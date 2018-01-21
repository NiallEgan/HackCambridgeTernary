import React, { Component } from 'react';
import Chart from 'chart.js';
import './ChartViewer.css';


function cdf(x, mean, variance) {
  return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
}

function erf(x) {
  // save the sign of x
  var sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  // constants
  var a1 =  0.254829592;
  var a2 = -0.284496736;
  var a3 =  1.421413741;
  var a4 = -1.453152027;
  var a5 =  1.061405429;
  var p  =  0.3275911;

  // A&S formula 7.1.26
  var t = 1.0/(1.0 + p*x);
  var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y; // erf(-x) = -erf(x);
}


var means_and_sds = {"Body Height": {"mean": 146.13410188840018, "sd": 37.76636660990193}, "Body Weight": {"mean": 65.80955305923196, "sd": 39.348331795805834}, "Body Mass Index": {"mean": 27.92753422445157, "sd": 9.560268797808495}, "Systolic Blood Pressure": {"mean": 129.81635687732341, "sd": 23.871651437758203}, "Diastolic Blood Pressure": {"mean": 84.57868649318463, "sd": 12.170247987161137}, "Oral temperature": {"mean": 37.65831248979285, "sd": 0.604804064633417}, "Quality adjusted life years": {"mean": 35.7190292936337, "sd": 22.488130741635796}, "Disability rating scale": {"mean": 1.5074787394925908, "sd": 4.873108435304803}, "Hemoglobin A1c/Hemoglobin.total in Blood": {"mean": 6.080925131139724, "sd": 1.0417184834598423}, "Glucose": {"mean": 88.8407248450167, "sd": 23.837340240606053}, "Urea Nitrogen": {"mean": 13.382451120648545, "sd": 4.085243003346898}, "Creatinine": {"mean": 1.0, "sd": 0.0}, "Calcium": {"mean": 9.345283198473748, "sd": 0.4922341521353083}, "Sodium": {"mean": 140.0119217930377, "sd": 2.591271614746249}, "Potassium": {"mean": 4.4545981629999165, "sd": 0.4321444050571934}, "Chloride": {"mean": 106.16738197424893, "sd": 3.1059996188586894}, "Carbon Dioxide": {"mean": 24.5793991416309, "sd": 2.9045398864186858}, "Total Cholesterol": {"mean": 187.89839867476533, "sd": 24.733915905090456}, "Triglycerides": {"mean": 148.9801214798454, "sd": 78.33095796272356}, "Low Density Lipoprotein Cholesterol": {"mean": 92.73937051352844, "sd": 24.991605248568327}, "High Density Lipoprotein Cholesterol": {"mean": 64.9723909442297, "sd": 14.04337014104499}, "Microalbumin Creatinine Ratio": {"mean": 36.62068965517241, "sd": 65.71837935270506}, "Estimated Glomerular Filtration Rate": {"mean": 59.960109289617485, "sd": 0.3355836430733812}, "FEV1/\u200bFVC": {"mean": 49.141129032258064, "sd": 20.38876790759565}, "DXA [T-score] Bone density": {"mean": -1.2010073858708579, "sd": 1.5602844668064841}, "Polyp size greatest dimension by CAP cancer protocols": {"mean": 6.982758620689655, "sd": 5.902925573056667}, "Hemoglobin.gastrointestinal [Presence] in Stool by Immunologic method": {"mean": 76.29310344827586, "sd": 138.26274445475798}, "Peanut IgE Ab in Serum": {"mean": 6.900373839842581, "sd": 19.728292605721293}, "Walnut IgE Ab in Serum": {"mean": 3.2633447294434395, "sd": 15.065481910247474}, "Codfish IgE Ab in Serum": {"mean": 7.428180435132913, "sd": 21.12613485036802}, "Shrimp IgE Ab in Serum": {"mean": 11.323256648925165, "sd": 26.74770858445868}, "Wheat IgE Ab in Serum": {"mean": 7.869460049745904, "sd": 21.712287532721348}, "Egg white IgE Ab in Serum": {"mean": 9.72549306285312, "sd": 24.83625639930992}, "Soybean IgE Ab in Serum": {"mean": 1.8947585627781838, "sd": 10.700552696194706}, "Cow milk IgE Ab in Serum": {"mean": 6.154177047865039, "sd": 20.054585999033783}, "White oak IgE Ab in Serum": {"mean": 14.588739445379316, "sd": 27.809833638543513}, "Common Ragweed IgE Ab in Serum": {"mean": 17.512674558326385, "sd": 29.62359954393813}, "Cat dander IgE Ab in Serum": {"mean": 25.867713548429688, "sd": 34.10958315011677}, "American house dust mite IgE Ab in Serum": {"mean": 20.928602930862308, "sd": 32.71918841657713}, "Cladosporium herbarum IgE Ab in Serum": {"mean": 20.003275820334487, "sd": 29.502470498043667}, "Honey bee IgE Ab in Serum": {"mean": 9.168601080249138, "sd": 21.728910546782174}, "Latex IgE Ab in Serum": {"mean": 3.9880783220644362, "sd": 13.765738364383207}, "Total score [MMSE]": {"mean": 12.606060606060606, "sd": 7.034285705760485}, "Percentage area affected by eczema Head and Neck": {"mean": 13.4, "sd": 20.228033353080406}, "Percentage area affected by eczema Trunk": {"mean": 3.066666666666667, "sd": 5.195724738239657}, "Percentage area affected by eczema Upper extremitiy - bilateral": {"mean": 21.533333333333335, "sd": 15.564346722200996}, "Percentage area affected by eczema Lower extremitiy - bilateral": {"mean": 13.066666666666666, "sd": 5.697562831792399}};

class ChartViewer extends Component {



  componentDidMount() {
    var values = [];
    var labels = [];

    var i,j,k;
    var val,p;



    for (i = 0; i < this.props.values.length; ++i) {
      val = this.props.values[i];
      console.log(val.value);
      labels.push(val.date);
      values.push(val.value)
    }


    var ctx = this.canvas.getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: labels,
          datasets: [{data:values, label:this.props.name}]
      },

      // Configuration options go here
      options: {responsive: false}
    });

  }

  render() {
    return (
      <div>
        <div className="ChartViewer">
          {this.state != null && <h2>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)} ({this.props.units})</h2>}
          <canvas ref={(c) => this.canvas = c} width="600px" />
        </div>

        <div className="Condition-percentile">
        <label className="percentile"> Percentile: </label>
        <label className = "percentile-value"> {Math.round(cdf(this.props.values[0].value, means_and_sds[this.props.name].mean, means_and_sds[this.props.name].sd) * 100)} % </label>

        </div>

      </div>
    );
  }

}

export default ChartViewer;
