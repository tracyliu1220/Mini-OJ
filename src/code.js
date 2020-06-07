import React, { Component } from 'react';
import { render } from 'react-dom';
import CodeMirror from 'react-codemirror';
// import Hello from './Hello';
// import './style.css';
import 'codemirror/lib/codemirror.css';

export default function FetchCode(props) {
  return (
    <Code />
  );
}

class Code extends Component {
  constructor() {
    super();
    this.state = {
      name: 'CodeMirror',
      code: '// Code'
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
		};
    return (
      <div className="w-100 code">
        <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }
}

// render(<Code />, document.getElementById('root'));
