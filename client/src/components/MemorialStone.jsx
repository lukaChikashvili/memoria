import React from 'react'
import stoneImg from '../assets/stone.png'
import Image from 'next/image'

const MemorialStone = ({ stone }) => {
  return (
    <div className="flex justify-center items-center ">
      <div className="relative flex justify-center items-center w-full h-full">
        <Image
          src={stoneImg}
          alt="stone"
          className="object-contain"
          width= {450}
          priority
        />

        <div className="absolute top-[30%] text-white text-center">
          {stone && stone?.images && stone.images.length > 0 ? (
            <Image src={stone?.images[0]} width = {150} height = {200} className=' -mt-10 rounded-xl grayscale hover:grayscale-100  object-contain mx-auto' alt= "image" /> 
          ) : (
            <></>
          )}
          <p className="text-md font-semibold  mt-16">{stone?.fullName} <span className='text-yellow-500'>({stone?. birthYear} - {stone?.deathYear})</span></p>
          
        </div>
      </div>
    </div>
  )
}

export default MemorialStone
