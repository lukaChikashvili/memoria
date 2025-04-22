"use client"
import { getScreenShots } from '@/actions/memorials'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [screenshots, setScreenshots] = useState([]);


    useEffect(() => {
       
        const getScreen = async () => {
          try {
            const res = await getScreenShots();
            setScreenshots(res);
          } catch (error) {
            console.error("Error fetching screenshots:", error);
          }
        };
    
        getScreen();
      }, []); 
     

  return (
    <div className='w-full bg-white  h-screen relative z-10 -mt-12'>
    <div className="flex flex-wrap justify-center">
      {screenshots.length > 0 ? (
        screenshots.map((url, index) => (
          <div key={index} className="m-4">
            <img 
              src={url} 
              alt={`Screenshot ${index + 1}`} 
              className="w-64 h-64 object-cover rounded-xl border-2 border-gray-300 duration-500 ease-in cursor-pointer hover:border-blue-500 shadow-lg" 
            />
          </div>
        ))
      ) : (
        <p>სურათები არ არის</p>
      )}
    </div>
  </div>
  )
}

export default page
