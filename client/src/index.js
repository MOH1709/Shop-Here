import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WidthProvider from "./contexts/WidthProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WidthProvider>
        <App />
      </WidthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
