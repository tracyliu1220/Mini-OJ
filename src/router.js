import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import FetchProblem from './problem';
import FetchNavBar from './nav';

import problem from './assets/data/problem.json';

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function MyRouter() {
  return (
    <Router>
        <Switch>
          {/*<Route path="/home" children={<Home />} />*/}
          <Route path="/problem/:id">
            <FetchProblem />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/:id">
            <Child />
          </Route>
        </Switch>
    </Router>
  );
}

class Home extends React.Component {
  constructor() {
    super();
    this.goto = this.goto.bind(this);
    this.problems = []
    for (var i = 0; i < problem.length; i++) {
      this.problems.push(
          <a href={"/problem/" + i} className="plistitem btn btn-light w-100">{problem[i].title}</a>
      )
    }
  }
  goto(idx) {
    window.location.href = "/problem/" + idx;
  }
  render() {
    return (
      <Router>
        <FetchNavBar home={true}/>
        <div className="mainfont">
          <div className="container w-65 plist">
            {this.problems}
          </div>
        </div>
      </Router>
    );
  }
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
