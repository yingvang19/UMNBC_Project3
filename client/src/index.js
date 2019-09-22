import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppProviders from './context'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));
