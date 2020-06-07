import React from "react";
import problem from "./assets/data/problem.json"

export default function FetchNavBar(props) {
  return (
    <NavBar home={props.home} id={props.id}/>
  );
}


function randint(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.gotoRandom = this.gotoRandom.bind(this);
    this.home = props.home;
    this.id = parseInt(props.id);
    this.n = problem.length;
    this.pre = (this.id - 1 + this.n) % this.n;
    this.next = (this.id + 1) % this.n;
  }
  gotoRandom() {
    window.location.href = "/problem/" + randint(0, this.n);
  }
  render() {
    const currentHome = this.home;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">MiniOJ</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pick a Problem
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {currentHome ?
                  <a className="dropdown-item" href="#" onClick={this.gotoRandom}>Random</a>
                :
                  <div>
                    <a className="dropdown-item" href={"/problem/" + this.pre}>Previous</a>
                    <a className="dropdown-item" href={"/problem/" + this.next}>Next</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={this.gotoRandom}>Random</a>
                  </div>
                }
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
