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
   const [shirtTexture, setShirtTexture] = useState('');

   const [presetModal, setPresetModal] = useState(false);

   const [currentPreset, setCurrentPreset] = useState('city');

   const [skirt, setSkirt] = useState('');
   const [skirtTexture, setSkirtTexture] = useState('');


   // remove cloth
   const [removeSkirt, setRemoveSkirt] = useState(false);

   const changePreset = (preset) => {
      setCurrentPreset(preset);

   }


 

  return (
    <ThemeContext.Provider value={{ bodyModal, setBodyModal, bodyColor, 
    setBodyColor, hair, setHair, eye, setEye, clothModal, setClothModal,
    shirt, setShirt, shirtTexture, setShirtTexture, presetModal, setPresetModal ,
    currentPreset, changePreset, skirt, setSkirt, skirtTexture, setSkirtTexture, 
    removeSkirt, setRemoveSkirt}}>
      {children}
    </ThemeContext.Provider>
  );
}


