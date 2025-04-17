"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import React, { useContext } from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'
import logo from '../assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'

const Header =  ({ isAdminPage = false}) => {

  const { setBodyModal, bodyModal } = useContext(ThemeContext);

    
  return (
    <div className='w-full flex items-center justify-between px-20 h-36 relative z-10'>
        <div>
          
        </div>

        <div className='flex gap-4'>
            <SignedIn>
               <Button variant = "outline" className='cursor-pointer '>ტანსაცმელი</Button>
               <Button variant = "outline" className='cursor-pointer ' onClick = {() => setBodyModal(!bodyModal)}>სხეული</Button>
             
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
