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

   const [currentPreset, setCurrentPreset] = useState(null);

   const [skirt, setSkirt] = useState('');
   const [skirtTexture, setSkirtTexture] = useState('');

   const [panty, setPanty] = useState('');

   const [feed, setFeed] = useState(false);



   // remove cloth
   const [removeSkirt, setRemoveSkirt] = useState(false);
   const [removeShirt, setRemoveShirt] = useState(false);
   const [removePanty, setRemovePanty] = useState(false);
   const [removeHair, setRemoveHair] = useState(false);
   const [imageUrl, setImageUrl] = useState(null);
   
   const changePreset = (preset) => {
      setCurrentPreset(preset);

   }

   const [selectedImage, setSelectedImage] = useState('');

   const [screenshotModal, setScreenshotModal] = useState(false);

 

  return (
    <ThemeContext.Provider value={{ bodyModal, setBodyModal, bodyColor, 
    setBodyColor, hair, setHair, eye, setEye, clothModal, setClothModal,
    shirt, setShirt, shirtTexture, setShirtTexture, presetModal, setPresetModal ,
    currentPreset, changePreset, skirt, setSkirt, skirtTexture, setSkirtTexture, 
    removeSkirt, setRemoveSkirt, removeShirt, setRemoveShirt, panty, setPanty, 
    removePanty, setRemovePanty, removeHair, setRemoveHair, imageUrl, setImageUrl, 
    feed, setFeed, selectedImage, setSelectedImage, setScreenshotModal, screenshotModal}}>
      {children}
    </ThemeContext.Provider>
  );
}


