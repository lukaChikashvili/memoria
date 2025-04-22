"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import React, { useContext } from 'react'
import { Button } from './ui/button'
import { ImageIcon, LogIn, PersonStanding, Shirt } from 'lucide-react'

import { ThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'
import logo from '../assets/logo.png'
import { ScreenCapture } from 'react-screen-capture'

const Header =  ({ isAdminPage = false}) => {

  const { setBodyModal, setImageUrl,bodyModal, clothModal, setClothModal, hair } = useContext(ThemeContext);

    const openCloth = () => {
      setClothModal(!clothModal);
      setBodyModal(false);
    }

    const closeBody = () => {
      setClothModal(false);
      setBodyModal(!bodyModal);
    }

    const handleScreenCapture = (screenCapture) => {
      setImageUrl(screenCapture); 
    };
  
  return (
    <div className='w-full flex items-center justify-between px-20 h-36 relative z-10'>
        <div>
          <Image src = {logo} alt = "logo" width = {100} height={100} />
        </div>

        <div className='flex gap-4'>
            <SignedIn>
               <Button variant = "outline" className='cursor-pointer flex items-center gap-4 ' style = {{backgroundColor: clothModal ? `#3A59D1` : "", color: clothModal ? `#fff` : "", }} onClick = {openCloth}><Shirt size = {30} /> ტანსაცმელი</Button>
               <Button variant = "outline" className='cursor-pointer ' style = {{backgroundColor: bodyModal ? `#3A59D1` : "",  color: bodyModal ? `#fff` : ""}} onClick = {closeBody}><PersonStanding /> სხეული</Button>
             
               <ScreenCapture onEndCapture={handleScreenCapture}>
          {({ onStartCapture }) => (
            <div>
              <Button variant = "outline" onClick={onStartCapture}> <ImageIcon /> სქრინშოტი</Button>
            </div>
          )}
        </ScreenCapture>

            </SignedIn>

            <SignedOut>
                <SignInButton forceRedirectUrl='/'>
                  <Button variant = "outline" className="cursor-pointer futuristic-button"><LogIn /> Enter</Button>
                </SignInButton>
              
            </SignedOut>

            <SignedIn>
            <UserButton appearance={
              {
                elements: {
                 avatarImage: "w-36 h-36"
                }
              }
            } />
          </SignedIn>


        </div>
      </div>
  )
}

export default Header
