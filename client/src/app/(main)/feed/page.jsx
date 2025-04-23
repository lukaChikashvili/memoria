"use client"
import { getPosts } from '@/actions/memorials'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        const getPostsFunc = async () => {
             try {
                const res = await getPosts();
                setPost(res);
             } catch (error) {
                
             }
        }

        getPostsFunc();
    }, [])

  return (
    <div className='w-full  h-screen relative z-10 -mt-12 px-12 screen'>
        <div className=''>
       {post?.map((value, index) => (
         <div className='pt-12' key = {index}>
            <Image className='rounded-md shadow-lg cursor-pointer' src = {value.imgUrl} alt = "img" width = {200} height = {200} />
            <h1>{value.title}</h1>
            <p>{value.description}</p>

            </div>
       ))}
       </div>
    </div>
  )
}

export default page
