import React from "react";
import {
  useParams
} from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import status from './assets/data/status.json'
import problem from './assets/data/problem.json'

export default function FetchProblem() {
  let { id } = useParams();
  return (
    <Problem id={id} />
  );
}

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.id = parseInt(props.id);
    // console.log(this.id);
    this.submit = this.submit.bind(this);
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
      "language_id": 50,
      "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello %s\\n\", name);\n  return 0;\n}",
      "stdin": problem[id].input,
      "expected_output": problem[id].expected_output
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

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
          if (res.error) throw new Error(res.error);

          console.log(res.body);
          alert(res.body.status.description);
        });
      }, 1500);

    });

  }
  // submit(0);

  // console.log("status");
  // console.log(status.token);


  render() {
    return (

        <button class="btn btn-info" onClick={this.submit}>
          submit
        </button>
    );
  }
}
