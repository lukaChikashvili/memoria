import { ThemeContext } from '@/context/ThemeContext'
import { X } from 'lucide-react'
import React, { useContext } from 'react'

const FeedModal = () => {
    const { setFeed } = useContext(ThemeContext);


  return (
    <div className='w-[80%] bg-white opacity-85 h-[80%] absolute top-0 ml-20 rounded-md shadow-lg '>
        <div className=''>
           <X className='absolute right-4 top-2 cursor-pointer' onClick={() => setFeed(false)} />
        </div>
    </div>
  )
}

export default FeedModal
