"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import React, { useContext } from 'react'
import { Button } from './ui/button'
import { LogIn, PersonStanding, Shirt } from 'lucide-react'

import { ThemeContext } from '@/context/ThemeContext'

const Header =  ({ isAdminPage = false}) => {

  const { setBodyModal, bodyModal, clothModal, setClothModal, hair } = useContext(ThemeContext);

    const openCloth = () => {
      setClothModal(!clothModal);
      setBodyModal(false);
    }

    const closeBody = () => {
      setClothModal(false);
      setBodyModal(!bodyModal);
    }
  return (
    <div className='w-full flex items-center justify-between px-20 h-36 relative z-10'>
        <div>
          
        </div>

        <div className='flex gap-4'>
            <SignedIn>
               <Button variant = "outline" className='cursor-pointer flex items-center gap-4 ' style = {{backgroundColor: clothModal ? `#FFB22C` : ""}} onClick = {openCloth}><Shirt size = {30} /> ტანსაცმელი</Button>
               <Button variant = "outline" className='cursor-pointer ' style = {{backgroundColor: bodyModal ? `#FFB22C` : ""}} onClick = {closeBody}><PersonStanding /> სხეული</Button>
             
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
