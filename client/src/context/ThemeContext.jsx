'use client'
import { createContext,  useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

   // body modal
   const [bodyModal, setBodyModal] = useState(false);
   const [bodyColor, setBodyColor] = useState("red");
 

  return (
    <ThemeContext.Provider value={{ bodyModal, setBodyModal, bodyColor, setBodyColor }}>
      {children}
    </ThemeContext.Provider>
  );
}


