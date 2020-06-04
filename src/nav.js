import React from "react";

export default function FetchNavBar(props) {
  return (
    <NavBar home={props.home}/>
  );
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.home = props.home;
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
                  <a className="dropdown-item" href="#">Random</a>
                :
                  <div>
                    <a className="dropdown-item" href="#">Previous</a>
                    <a className="dropdown-item" href="#">Next</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Random</a>
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
