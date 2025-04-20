import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import Image from 'next/image';

const ClothModal = () => {

    const { shirt, setShirt } = useContext(ThemeContext);

    const colors = ['#F7374F', '#F14A00', '#500073', '#1F7D53', '#4B70F5', '#EEEEEE', 
                    '#FEBA17', '#FF2DF1', '#B03052', '#CCDF92', '#8B5DFF', 'black'];
    const images = ['https://img.freepik.com/premium-vector/abstract-background-design-vector-illustration_1299084-7915.jpg?semt=ais_hybrid&w=740', 
    'https://img.freepik.com/free-vector/hand-drawn-abstract-leaves-pattern_23-2149001508.jpg?semt=ais_hybrid&w=740', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAxOrylLiXIEgzuHGmJcs2WyA6BQNdSYEKN9A62503klBnrXPvdwSyLgQ1c1YNWW-zpIo&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7MikGBW_xLCqrQycWFPaYHJ9qzl6pS6bWg&s'];
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
            alt = "image" width = {100} height = {100} className='rounded-md shadow-lg cursor-pointer duration-500 ease hover:opacity-60'
            />
           ))}
        </div>
      </CardContent>
    </Card>
  
  
    
    <Button >შენახვა</Button>
  </div>
  </div>
  
  )
}

export default ClothModal
