import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import WidthProvider from "./contexts/WidthProvider";

ReactDOM.render(
  <React.StrictMode>
    <WidthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WidthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
