"use client"
import { deleteScreenShot, getScreenShots } from '@/actions/memorials'
import FeedModal from '@/components/FeedModal';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import { Trash, Trash2, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';



const page = () => {

    const [screenshots, setScreenshots] = useState([]);
  
    const { setFeed, feed } = useContext(ThemeContext);

    const router = useRouter();

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

     
      const handleDelete = async (url) => {
        try {
          await deleteScreenShot(url);
          setScreenshots((prev) => prev.filter((img) => img !== url));
          toast.success("სურათი წაიშალა")
        } catch (error) {
          console.error("Error deleting screenshot:", error);
        }
      };


      const publishScreenshot = () => {
         setFeed(true);
      }
      
     

  return (
    <div className='w-full  h-screen relative z-10 -mt-12 px-12 screen'>
    <div className="flex flex-wrap justify-center">
      {screenshots.length > 0 ? (
        screenshots.map((url, index) => (
          <div key={index} className="m-4">
            <img 
              src={url} 
              alt={`Screenshot ${index + 1}`} 
              className="w-64 h-64 object-cover rounded-xl border-2 border-gray-300 duration-500 ease-in cursor-pointer hover:border-blue-500 shadow-lg" 
            />
            <div className='flex items-center gap-4 bg-[#]'>
            <Button onClick={() => handleDelete(url)}  className = "flex items-center   bg-red-500 text-white  mt-4 cursor-pointer shadow-lg duration-500 ease ">
            <Trash2 size = {30}
             
             className="cursor-pointer text-white hover:opacity-55 "
/>      წაშლა
            </Button>
                   
         <Button className="bg-[#3A59D1] text-white  mt-4 cursor-pointer shadow-lg duration-500 ease hover:bg-blue-400" onClick = {publishScreenshot}>გამოქვეყნება</Button>
              </div>
          </div>
        ))
      ) : (
        <p>სურათები არ არის</p>
      )}
    </div>


    {feed && <FeedModal />}
  </div>
  )
}

export default page
