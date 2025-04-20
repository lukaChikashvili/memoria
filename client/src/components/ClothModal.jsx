import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import Image from 'next/image';
import texture1 from '../assets/texture1.jpg'
import texture2 from '../assets/texture2.png'
import texture3 from '../assets/texture3.jpg'
import texture4 from '../assets/texture4.png'


const ClothModal = () => {

    const { shirtTexture, setShirtTexture, setShirt } = useContext(ThemeContext);

    const colors = ['#F7374F', '#F14A00', '#500073', '#1F7D53', '#4B70F5', '#EEEEEE', 
                    '#FEBA17', '#FF2DF1', '#B03052', '#CCDF92', '#8B5DFF', 'black'];
    const images = [texture1, texture2, texture3, texture4];
   const eyecolor = ['#FFDEDE', '#E8C999', '#C9B194', '#945034', '#A9B5DF', 'black'];


  return (
    <div className='h-screen px-12 relative w-[43rem] '>

    <div className='absolute inset-0 z-10 px-12 flex flex-col gap-6'>
   
   
  
    <Card className="relative z-10 -mt-8 ">
      <CardHeader>
        <CardTitle>შეარჩიეთ ტანსაცმელი</CardTitle>
        <CardDescription>ტოპის ფერი</CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className='flex gap-4 flex-wrap'>
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => setShirt(color)}
              className="w-8 h-8 rounded-lg cursor-pointer hover:border-white"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </CardContent>
    </Card>


    <Card className="relative z-10  ">
      <CardHeader>
        <CardTitle>შეარჩიეთ ტანსაცმელი</CardTitle>
        <CardDescription>ტოპის ფერი</CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className='flex gap-4 flex-wrap'>
           {images.map((value, i) => (
            <Image key={i} src = {value}
            alt = "image" width = {100} height = {100} 
              onClick={() => setShirtTexture(value)}
             className='rounded-md shadow-lg cursor-pointer duration-500 ease hover:opacity-60'
            />
           ))}
        </div>
      </CardContent>
    </Card>
  
  
    
    <Button className='bg-yellow-600'>შენახვა</Button>
  </div>
  </div>
  
  )
}

export default ClothModal
