import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import Image from 'next/image';
import texture1 from '../assets/texture1.jpg'
import texture2 from '../assets/texture2.png'
import texture3 from '../assets/texture3.jpg'
import texture4 from '../assets/texture4.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Eye, EyeClosed } from 'lucide-react';


const ClothModal = () => {

    const { setSkirt, setShirtTexture, setShirt, setSkirtTexture, removeSkirt, setRemoveSkirt } = useContext(ThemeContext);

    const colors = ['#F7374F', '#F14A00', '#500073', '#1F7D53', '#4B70F5', '#EEEEEE', 
                    '#FEBA17', '#FF2DF1', '#B03052', '#CCDF92', '#8B5DFF', 'black'];
    const images = [texture1, texture2, texture3, texture4];
   const skirtColor = ['#FFD63A', '#F75A5A', '#BF9264', '#8E7DBE', '#328E6E',
   '#4F1C51', '#FF9A9A', '#DBDBDB', '#E53888', '#443627', 'black'];


  return (
    <div className='h-screen px-12 relative w-[43rem] '>

   
<div className='absolute inset-0 z-10 px-12 flex flex-col gap-6'>
   
  <Tabs defaultValue = "shirt">
 

  <TabsList>
          <TabsTrigger value="shirt">
          
            ზედა ტანსაცმელი
          </TabsTrigger>
          <TabsTrigger value="skirt">
          
            ქვედა ტანსაცმელი
          </TabsTrigger>

          <TabsTrigger value="visibility">
          
            გახადე ტანსაცმელი
          </TabsTrigger>
        </TabsList>

<TabsContent value = "shirt" className="flex flex-col gap-4">


    <Card className="relative z-10  ">
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
        <CardDescription>ტოპის პრინტი</CardDescription>
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
    </TabsContent>

    <TabsContent value = "skirt" className="flex flex-col gap-4">
    <Card className="relative z-10  ">
      <CardHeader>
        <CardTitle>შეარჩიეთ ტანსაცმელი</CardTitle>
        <CardDescription>ქვედაბოლოს ფერი</CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className='flex gap-4 flex-wrap'>
        {skirtColor.map((color) => (
            <Button
              key={color}
              onClick={() => setSkirt(color)}
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
        <CardDescription>ქვედაბოლოს პრინტი</CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className='flex gap-4 flex-wrap'>
           {images.map((value, i) => (
            <Image key={i} src = {value}
            alt = "image" width = {100} height = {100} 
              onClick={() => setSkirtTexture(value)}
             className='rounded-md shadow-lg cursor-pointer duration-500 ease hover:opacity-60'
            />
           ))}
        </div>
      </CardContent>
    </Card>

    </TabsContent>

    <TabsContent value = "visibility" className="flex flex-col gap-4">
    <Card className="relative z-10  ">
      <CardHeader>
        <CardTitle>გახადეთ ტანსაცმელი</CardTitle>
        <CardDescription>მოაშორე ზედა</CardDescription>
      </CardHeader>
  
      <CardContent className="flex items-center gap-4">
          <Button>პერანგის მოშორება</Button>
          <Button onClick = {() => setRemoveSkirt(!removeSkirt)}>{removeSkirt ? <Eye /> : <EyeClosed />}კაბის მოშორება</Button>
      </CardContent>
    </Card>

  
      </TabsContent>
  
    </Tabs>
  
  
    
    <Button className='bg-[#3A59D1]'>შენახვა</Button>
  </div>
  </div>
  
  )
}

export default ClothModal
