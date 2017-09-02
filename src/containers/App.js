import React, { Component } from 'react';
import { Tree } from './';
import { logo } from '../images';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Tree />
      </div>
    );
  }
}

export default App;
