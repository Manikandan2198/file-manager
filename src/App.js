import React, { Component } from 'react';
import Main from './layout/main';
import Tree from './layout/Tree';
import './App.css';

class App extends Component {



  render() {

    return (
      <div className="d-flex flex-row w-100 h-100">
        <Tree/>
        <Main/>
      </div>
    );
  }
}

export default App;
