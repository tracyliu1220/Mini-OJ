import React from "react";
import {
  useParams
} from "react-router-dom";
import FetchNavBar from './nav';
// import FetchCode from './code';
import problem from './assets/data/problem.json';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';
import './assets/css/style.css';


export default function FetchProblem() {
  let { id } = useParams();
  return (
    <div className="h-100 w-100 page">
      <FetchNavBar home={false}/>
      <Problem id={id} />
    </div>
  );
}

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.id = parseInt(props.id);
    // console.log(this.id);
    this.submit = this.submit.bind(this);
    this.code = React.createRef();
  }
  submit() {
    var id = this.id;
    // create a submission
    var unirest = require("unirest");

    var req = unirest("POST", "https://judge0.p.rapidapi.com/submissions");

    req.headers({
      "x-rapidapi-host": "judge0.p.rapidapi.com",
      "x-rapidapi-key": "4d4ae6f7ecmsh76fee8d041f099fp15ceecjsn4b098ac1bc72",
      "content-type": "application/json",
      "accept": "application/json",
      "useQueryString": true
    });

    req.type("json");
    req.send({
      "language_id": 54,
      "source_code": this.code.current.state.code,
      "stdin": problem[id].input,
      "expected_output": problem[id].expected_output,
      "cpu_time_limit": 1
    });

    req.end(function (res) {
      // if (res.error) throw new Error(res.error);

      console.log(res.body);

      setTimeout(function() {
        // get a submission
        var unirest = require("unirest");
        var req = unirest("GET", "https://judge0.p.rapidapi.com/submissions/"+res.body.token);

        req.headers({
          "x-rapidapi-host": "judge0.p.rapidapi.com",
          "x-rapidapi-key": "4d4ae6f7ecmsh76fee8d041f099fp15ceecjsn4b098ac1bc72",
          "useQueryString": true
        });

        req.end(function (res) {
          // if (res.error) throw new Error(res.error);
          if (res.error) {
            alert("Compile Error");
          } else {
            console.log(res.body);
            alert(res.body.status.description);
          }
        });
      }, 3000);

    });

  }
  // submit(0);

  // console.log("status");
  // console.log(status.token);


  render() {
    return (
        <div className="h-100">
          <div className="container w-100 h-100">
          <div className="row h-100">
            <div className="col-sm mainfont">
              Problem Statement
            </div>
            <div className="col-sm">
              {/*}<textarea className="w-100"/>*/}
              <div style={{height: "85%"}}>
                <Code ref={this.code}/>
              </div>



              {/*}<div className="w-100 h-25 submitarea">*/}
                <button className="submit w-100 btn btn-info" onClick={this.submit}>
                  submit
                </button>
              {/*}</div>*/}
            </div>
          </div>
          </div>
        </div>
    );
  }
}


require('codemirror/mode/clike/clike');
// mode: 'clike',
// readOnly: false

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'CodeMirror',
      code: '// Code\n'
    };
  }

  updateCode(newCode) {
		this.setState({
			code: newCode,
		});
	}

  render() {
    let options = {
			lineNumbers: true,
      theme: 'base16-light'
		};
    return (
      <div className="w-100 h-100">
        <CodeMirror style={{height: "800px"}} value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }
}
