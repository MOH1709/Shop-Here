import { createContext, useState } from "react";

const Context = createContext(null);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <Context.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context };
