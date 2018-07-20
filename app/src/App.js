import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import FileList from './components/FileList/FileList';
import FileUpload from './components/FileUpload/FileUpload';

// const database = Firebase.database();

class App extends Component {

  render() {
    
    return (
      <div className="App">
        <Header />
        <p> HI </p>
        <div className="content">
          <FileUpload />
            <br />
          <FileList />
        </div>
      </div>
    );
  }
}

export default App;
