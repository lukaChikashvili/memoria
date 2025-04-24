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
import { Eye, EyeClosed, EyeOff, Loader2, Shirt } from 'lucide-react';
import { addCloth } from '@/actions/memorials';
import { toast } from 'sonner';
import { Icon } from 'lucide-react';
import { dress } from '@lucide/lab';


const ClothModal = () => {

    const { setSkirt, shirt,shirtTexture, skirt, skirtTexture, setShirtTexture, setShirt, setSkirtTexture, removeSkirt,
       setRemoveSkirt, removeShirt, setRemoveShirt , setClothModal,setPanty, removePanty, setRemovePanty, removeHair, setRemoveHair} = useContext(ThemeContext);

    const colors = ['#F7374F', '#F14A00', '#500073', '#1F7D53', '#4B70F5', '#EEEEEE', 
                    '#FEBA17', '#FF2DF1', '#B03052', '#CCDF92', '#8B5DFF', 'black'];
    const images = [texture1, texture2, texture3, texture4];
   const skirtColor = ['#FFD63A', '#F75A5A', '#BF9264', '#8E7DBE', '#328E6E',
   '#4F1C51', '#FF9A9A', '#DBDBDB', '#E53888', '#443627', 'black'];


   // save cloth 
   const saveCloth = async () => {
    try {
     const res = await addCloth({shirt, shirtTexture:shirtTexture.src, skirt,
       skirtTexture:skirtTexture.src, removeHair, removeShirt, removeSkirt} )
     if(res.success) {
       toast.success("ცვლილება შეინახა წარმატებით");
      setClothModal(false);
     }
    } catch (error) {
       console.log(error)
    }
}



  return (
    <div className='h-screen px-0 md:px-12 relative md:w-[43rem] mt-8'>

   
<div className='absolute inset-0  px-4 md:px-12 flex flex-col gap-6'>
   
  <Tabs defaultValue = "shirt" className="z-10">
 

  <TabsList className="flex flex-wrap justify-center gap-2">
  <TabsTrigger value="shirt" className="flex items-center gap-2">
    <Shirt className="h-5 w-5" />
    <span className="hidden sm:inline">ზედა ტანსაცმელი</span>
  </TabsTrigger>

  <TabsTrigger value="skirt" className="flex items-center gap-2">
    <Icon iconNode={dress} />
    <span className="hidden sm:inline">ქვედა ტანსაცმელი</span>
  </TabsTrigger>

  <TabsTrigger value="visibility" className="flex items-center gap-2">
    <EyeOff className="h-5 w-5" />
    <span className="hidden sm:inline">გახადე ტანსაცმელი</span>
  </TabsTrigger>
</TabsList>
<TabsContent value = "shirt" className="flex flex-col gap-4">


    <Card className="relative z-10 bg-white opacity-80 ">
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
 


    <Card className="relative z-10 bg-white opacity-80 ">
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
             className='rounded-md shadow-lg cursor-pointer duration-500 ease hover:opacity-60 w-[50px] md:w-[100px]'
            />
           ))}
        </div>
      </CardContent>
    </Card>
    </TabsContent>

    <TabsContent value = "skirt" className="flex flex-col gap-4">
    <Card className="relative z-10 bg-white opacity-80 ">
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

{!removeSkirt && 
    <Card className="relative z-10 bg-white opacity-80 ">
      <CardHeader>
        <CardTitle>შეარჩიეთ ტანსაცმელი</CardTitle>
        <CardDescription>ქვედაბოლოს პრინტი</CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className='flex gap-4 flex-wrap'>
           {images.map((value, i) => (
            <Image key={i} src = {value}
            alt = "image" width = {60} height = {60} 
              onClick={() => setSkirtTexture(value)}
             className='rounded-md shadow-lg cursor-pointer duration-500 ease hover:opacity-60'
            />
           ))}
        </div>
      </CardContent>
    </Card>
}

    {removeSkirt &&  <Card className="relative z-10 bg-white opacity-80 ">
      <CardHeader>
        <CardTitle>საცვალი / ნიფხავი </CardTitle>
        <CardDescription>აარჩიეთ ფერი</CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className='flex gap-4 flex-wrap'>
        {skirtColor.map((color) => (
            <Button
              key={color}
              onClick={() => setPanty(color)}
              className="w-8 h-8 rounded-lg cursor-pointer hover:border-white"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
}

    </TabsContent>

    <TabsContent value = "visibility" className="flex flex-col gap-4">
    <Card className="relative z-10  bg-white opacity-80">
      <CardHeader>
        <CardTitle>გახადეთ ტანსაცმელი</CardTitle>
        <CardDescription>მოაშორე ზედა</CardDescription>
      </CardHeader>
  
      <CardContent className="flex items-center flex-wrap gap-1">
          <Button variant="secondary" onClick = {() => setRemoveShirt(!removeShirt)}>{removeShirt ? <Eye /> : <EyeClosed />} პერანგის მოშორება</Button>
          <Button variant="outline" onClick = {() => setRemoveSkirt(!removeSkirt)}>{removeSkirt ? <Eye /> : <EyeClosed />}კაბის მოშორება</Button>
          <Button variant="outline" onClick = {() => setRemoveHair(!removeHair)}>{removeHair ? <Eye /> : <EyeClosed />}თმის მოშორება</Button>
          {removeSkirt && <Button variant="outline" onClick = {() => setRemovePanty(!removePanty)}>{removePanty ? <Eye /> : <EyeClosed />}საცვლის მოშორება</Button> }
      </CardContent>
    </Card>

  
      </TabsContent>
  
    </Tabs>
  
  
    
    <Button className='bg-[#3A59D1] text-white z-10 ' onClick = {saveCloth}>შენახვა</Button>
  </div>
  </div>
  
  )
}

export default ClothModal
