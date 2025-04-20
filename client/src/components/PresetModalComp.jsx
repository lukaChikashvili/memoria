import React, { useContext } from 'react'
import city from '../assets/city.jpg'
import apartment from '../assets/apartment.jpg'
import forest from '../assets/forest.jpg'
import park from '../assets/park.jpg'
import studio from '../assets/studio.jpg'
import sunset from '../assets/sunset.jpg'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext'


const PresetModalComp = () => {
    const images = [
       {
        title: "ქალაქი",
        img: city,
        label: "city"
       },

       {
        title: "ტყე",
        img: forest,
        label: "forest"
       },

       {
        title: "ბინა",
        img: apartment,
        label: "apartment"
       },

       {
        title: "სტუდია",
        img: studio,
        label: "studio"
       },

       {
        title: "პარკი",
        img: park,
        label: "park"
       },

       {
        title: "მზის ჩასვლა",
        img: sunset,
        label: "sunset"
       },


    ];

    const { changePreset, } = useContext(ThemeContext);

  return (
    <div className='w-[80%] h-[65vh] mx-auto flex items-center justify-center rounded-md shadow-lg bg-white opacity-80 relative z-10'>
        <div className='grid grid-cols-3 gap-12'>
        {images.map((img, i) => (
            <div className='flex flex-col items-center gap-4' key = {i} >
                
                <Image onClick={() => changePreset(img.label)} className='rounded-lg shadow-lg border-4 cursor-pointer duration-500 ease hover:border-yellow-500' src = {img.img} alt = "img" width = {200} height={200} />
                <h1 className='font-semibold'>{img.title}</h1>
            </div>
        ))}
        </div>
      
    </div>
  )
}

export default PresetModalComp
