import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reduxFlow/reducers/rootReducer';

const store = createStore(
  rootReducer
)


ReactDOM.render(
  < Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
