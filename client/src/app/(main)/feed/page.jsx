"use client"
import { getPosts } from '@/actions/memorials'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [posts, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getPostsFunc = async () => {
             try {
                const res = await getPosts();
                setPost(res);
                
             } catch (error) {
                console.log(error)
             }finally {
                setLoading(false);
              }
        }

        getPostsFunc();
    }, []);

    if (loading) {
        return (
            <div className="spinner center">
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
        
          </div>
        );
      }
    



  return (
    <div className="w-full min-h-screen screen py-20 px-6 sm:px-12 relative z-10 -mt-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {posts?.map((post, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="relative w-full h-64 mb-4 overflow-hidden rounded-xl">
            <Image
              src={post.imgUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg cursor-pointer"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">{post.title}</h1>
          <p className="text-gray-600 mt-2">{post.description}</p>
          <p className="text-sm text-gray-500 mt-4 italic">
            ავტორი: {post.user?.name || "მომხმარებელი უცნობია"}
          </p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default page
