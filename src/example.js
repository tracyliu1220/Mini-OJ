import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

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

// function Home() {
//   let {id } = useParams();
//   return (
//     <Router>
//       <div>
//         <h2>Accounts</h2>
//         <ul>
//           <li>
//             <Link to="/children/netflix">Netflix</Link>
//           </li>
//           <li>
//             <Link to="/children/zillow-group">Zillow Group</Link>
//           </li>
//           <li>
//             <Link to="/children/yahoo">Yahoo</Link>
//           </li>
//           <li>
//             <Link to="/children/modus-create">Modus Create</Link>
//           </li>
//         </ul>
//       </div>
//     </Router>
//   );
// }

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  if (id === "home") {
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
              <Link to="/zillow-group">Zillow Group</Link>
              <Link to="/zillow-group">Zillow Group</Link>
            </li>
            <li>
              <Link to="/yahoo">Yahoo</Link>
              <Link to="/yahoo">Yahoo</Link>
            </li>
            <li>
              {/*<Link to="/modus-create">Modus Create</Link>*/}
              <Link to="/modus-create">Modus Create</Link>
            </li>
            <li>
              <Link to="/hello">Hello</Link>
            </li>
          </ul>
        </div>
      </Router>
    );
  }

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
