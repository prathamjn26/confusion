import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from "react-router-dom"
import {ConfigureStore} from './redux/configureStore';
import {Provider} from 'react-redux'

const store=ConfigureStore();

class App extends Component {

  render()
  {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  );
 }
}

export default App;
