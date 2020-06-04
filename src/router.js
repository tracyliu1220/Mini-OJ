import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import FetchProblem from './problem';

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
          <Route path="/hello">
            <Hello />
          </Route>
          <Route path="/:id">
            <Child />
          </Route>
        </Switch>
    </Router>
  );
}

function Hello() {
  return (
    <h1>Hello</h1>
  );
}

function Home() {
  return (
    <Router>
      <div>
        <h2>Accounts</h2>
        <ul>
          <li>
            {/*<Link to="/netflix">Netflix</Link>*/}
            <a href="/netflix">Netflix</a>
          </li>
          <li>
            <a href="/zillow-group">Zillow Group</a>
            {/*<Link to="/zillow-group">Zillow Group</Link>*/}
          </li>
          <li>
            <a href="/yahoo">Yahoo</a>
            {/*<Link to="/yahoo">Yahoo</Link>*/}
          </li>
          <li>
            {/*<Link to="/modus-create">Modus Create</Link>*/}
            <a href="/modus-create">Modus Create</a>
          </li>
          <li>
            <a href="/hello">Hello</a>
          </li>
        </ul>
      </div>
    </Router>
  );
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
