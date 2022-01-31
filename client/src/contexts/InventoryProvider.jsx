import { createContext, useState } from "react";

const Context = createContext(null);

export default function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);

  return (
    <Context.Provider
      value={{
        inventory,
        setInventory,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context };
