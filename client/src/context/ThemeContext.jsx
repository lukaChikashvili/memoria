'use client'
import { createContext,  useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

   // body modal
   const [bodyModal, setBodyModal] = useState(false);

   // body properties
   const [bodyColor, setBodyColor] = useState("");
   const [hair, setHair] = useState("");
   const [eye, setEye] = useState('');

   // cloth modal
   const [clothModal, setClothModal] = useState(false);

   const [shirt, setShirt] = useState('');


 

  return (
    <ThemeContext.Provider value={{ bodyModal, setBodyModal, bodyColor, 
    setBodyColor, hair, setHair, eye, setEye, clothModal, setClothModal,
    shirt, setShirt }}>
      {children}
    </ThemeContext.Provider>
  );
}


