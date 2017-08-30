import React, { Component } from 'react';
import Tree from './Tree';
import logo from './logo.svg';
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
