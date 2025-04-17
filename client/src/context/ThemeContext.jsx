'use client'
import { createContext,  useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

   // body modal
   const [bodyModal, setBodyModal] = useState(false);
   const [bodyColor, setBodyColor] = useState("");
   const [hair, setHair] = useState("");
   const [eye, setEye] = useState('');

 

  return (
    <ThemeContext.Provider value={{ bodyModal, setBodyModal, bodyColor, 
    setBodyColor, hair, setHair, eye, setEye }}>
      {children}
    </ThemeContext.Provider>
  );
}


