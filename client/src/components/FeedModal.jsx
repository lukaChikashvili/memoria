import { ThemeContext } from '@/context/ThemeContext'
import { X } from 'lucide-react'
import React, { useContext } from 'react'
import { Input } from './ui/input';
import Image from 'next/image';

const FeedModal = () => {
    const { setFeed, selectedImage } = useContext(ThemeContext);


  return (
    (
        <div className='w-[90%] max-w-3xl bg-white opacity-95 h-[80%] absolute top-10 left-1/2 -translate-x-1/2 rounded-xl shadow-2xl p-8 z-50'>
          
        
          <div className='flex justify-end'>
            <X 
              className='cursor-pointer text-gray-500 hover:text-red-500 transition-all duration-200' 
              onClick={() => setFeed(false)} 
            />
          </div>
    
          <div className='flex flex-col gap-6 mt-4'>
            
         
            <Input 
              type="text" 
              placeholder="შეყვარებულის სახელი ან სურათის სათაური.." 
              className='text-lg py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none'
            />
    
           
            <textarea 
              placeholder="მესიჯი ან აღწერა..." 
              rows={5} 
              className='resize-none w-full border border-gray-300 rounded-md px-4 py-3 text-base shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none'
            ></textarea>
    
           <Image src = {selectedImage} alt = "img" width = {200} height = {200}  className='rounded-md shadow-lg cursor-pointer hover:opacity-80'/>
            
     
            <button className='bg-[#3A59D1] cursor-pointer hover:bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md transition duration-300'>
              გამოქვეყნება
            </button>
          </div>
        </div>
    ))
}

export default FeedModal
