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
    this.setLang = this.setLang.bind(this);
    this.code = React.createRef();
    this.lang = React.createRef();
    this.problem = problem[this.id];
    this.lang_id = -1;
    this.lang_name = "Language";
  }
  submit() {
    if (this.lang_id == -1) {
      alert("Please choose a language");
      return;
    }

    // var id = this.id;
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
      "language_id": this.lang_id,
      "source_code": this.code.current.state.code,
      "stdin": this.problem.input,
      "expected_output": this.problem.expected_output,
      "cpu_time_limit": this.problem.time_limit
    });

    req.end(function (res) {
      // if (res.error) throw new Error(res.error);

      // console.log(res.body);

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
            // console.log(res.body);
            alert(res.body.status.description);
          }
        });
      }, 3500);

    });

  }

  setLang(id, name) {
    this.lang_id = id;
    this.lang_name = name;
    if (id == 54)
      this.code.current.mode = 'clike';
    else
      this.code.current.mode = 'python';
  }

  render() {
    return (
        <div className="h-100 side">
          <FetchNavBar home={false} id={this.id}/>
          <div className="container w-100 h-100">
            <div className="row h-100">
              <div className="col-sm mainfont statement h-100">
                <h1>{this.problem.title}</h1>
                <h6>Time Limit: {this.problem.time_limit} sec</h6>
                <h4>Problem Description</h4>
                {this.problem.description.split('\n').map((it, i) => <p key={"de"+i}>{it}</p>)}
                <h4>Input Format</h4>
                {this.problem.input_format.split('\n').map((it, i) => <p key={"in_f"+i}>{it}</p>)}
                <h4>Output Format</h4>
                {this.problem.output_format.split('\n').map((it, i) => <p key={"out_f"+i}>{it}</p>)}
                <h4>Sample Input</h4>
                <div className="codearea">
                  {this.problem.sample_input.split('\n').map((it, i) => <p key={"in_s"+i}>{it}</p>)}
                </div>
                <h4>Sample Output</h4>
                <div className="codearea output">
                  {this.problem.sample_output.split('\n').map((it, i) => <p key={"out_s"+i}>{it}</p>)}
                </div>
              </div>
              <div className="col-sm">
                <div className="btn-group language">
                  <button type="button" className="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.lang_name}
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#" onClick={() => this.setLang(54, "C++")}>C++</a>
                    <a className="dropdown-item" href="#" onClick={() => this.setLang(71, "Python")}>Python</a>
                  </div>
                </div>
                {/*}<textarea className="w-100"/>*/}
                <div style={{height: "80%"}}>
                  <Code ref={this.code}/>
                </div>



                {/*}<div className="w-100 h-25 submitarea">*/}
                  <button className="submit w-100 btn btn-info" onClick={this.submit}>
                    Submit
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
require('codemirror/mode/python/python');
// mode: 'clike',
// readOnly: false

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'CodeMirror',
      code: '// Code\n',
      mode: 'clike'
    };
    this.mode = 'clike';
  }

  updateCode(newCode) {
		this.setState({
			code: newCode,
      mode: this.mode
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
