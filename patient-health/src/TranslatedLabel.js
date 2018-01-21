import React, { Component } from 'react';
import MsTranslator from 'mstranslator';
import https from 'https';
import language from './App.js';

class TranslatedLabel extends Component {

  componentDidMount() {
    this.setState({text: this.props.text});

    if (!this.props.language.startsWith("en")) {
      /*
      var client = new MsTranslator({
        api_key: "ab0f57df892e44e08e8164a57de66ee2"
      }, true);

      var params = {
        text: this.props.text,
        from: 'en',
        to: this.props.language
      }

      var label = this;

      console.log(this.props.text);

      client.translate(params, function(err, data) {
        console.log(err);
        console.log(data);
        label.setState({text: data});
      })
      */

      // Replace the subscriptionKey string value with your valid subscription key.
      let subscriptionKey = 'ab0f57df892e44e08e8164a57de66ee2';

      let host = 'api.microsofttranslator.com';
      let path = '/V2/Http.svc/Translate';

      let target = 'fr-fr';
      let text = 'Hello';

      let params = '?to=' + target + '&text=' + encodeURI(text);

      let response_handler = function (response) {
          let body = '';
          response.on ('data', function (d) {
              body += d;
          });
          response.on ('end', function () {
              console.log (body);
          });
          response.on ('error', function (e) {
              console.log ('Error: ' + e.message);
          });
      };

      let Translate = function () {
          let request_params = {
              method : 'GET',
              hostname : host,
              path : path + params,
              headers : {
                  'Ocp-Apim-Subscription-Key' : subscriptionKey,
              }
          };

          let req = https.request (request_params, response_handler);
          req.end ();
      }

      Translate ();
    }
  }

  render() {
    return (this.state != null && <label className={this.props.className}>{this.state.text}</label>);
  }

}

export default TranslatedLabel;
