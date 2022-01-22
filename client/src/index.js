import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { WidthProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WidthProvider>
        <App />
      </WidthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
