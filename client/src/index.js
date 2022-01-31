import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { WidthProvider, CartProvider, InventoryProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WidthProvider>
        <CartProvider>
          <InventoryProvider>
            <App />
          </InventoryProvider>
        </CartProvider>
      </WidthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
