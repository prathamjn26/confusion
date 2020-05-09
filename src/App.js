import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from "react-router-dom"

class App extends Component {

  render()
  {
  return (
    <BrowserRouter>
       <Main/>
    </BrowserRouter>
  );
 }
}

export default App;
