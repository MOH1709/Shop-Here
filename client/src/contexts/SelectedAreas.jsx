import { createContext, useState } from "react";

const Context = createContext(null);

export default function SelectedAreas({ children }) {
  const [selectedAreas, setSelectedAreas] = useState([]);

  return (
    <Context.Provider
      value={{
        selectedAreas,
        setSelectedAreas,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context };
