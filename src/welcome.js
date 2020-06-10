import React from "react";


function gotoHome() {
  window.location.href = "/home";
}

function gotoSrc() {
  window.location.href = "https://github.com/tracyliu1220/Mini-OJ";
}

function gotoIntro() {
  window.location.href = "https://docs.google.com/presentation/d/16OzRsF1F2R-XlkWMY1RK_j80BQrtL_j763YUwwmACok/edit?usp=sharing";
}

export default function FetchWelcome() {
  return (
    <div className="mainfont welcome">
      <div className="welcome-block">
        <h1 className="welcome-title">MiniOJ</h1>
        <p className="welcome-full-title">Mini Online Judge</p>
        <button type="button" className="btn btn-outline-info welcome-btn" onClick={gotoHome}>Website</button>
        <button type="button" className="btn btn-outline-info welcome-btn" onClick={gotoIntro}>Introduction</button>
        <button type="button" className="btn btn-outline-info welcome-btn" onClick={gotoSrc}>Source Code</button>
      </div>
    </div>
  );
}
