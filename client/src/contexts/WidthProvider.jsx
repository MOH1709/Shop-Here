import React, { createContext, useEffect, useState } from "react";

const Context = createContext(null);

export default function WidthProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <Context.Provider
      value={{
        width,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context };
