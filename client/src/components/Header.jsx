import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import React from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'
import logo from '../assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Header = async ({ isAdminPage = false}) => {
    
  return (
    <div className='w-full flex items-center justify-between px-20 h-36'>
        <div>
          <Link href = {isAdminPage ? "/admin" : "/"}>
           
            </Link>
        </div>

        <div className='flex gap-12'>
            <SignedIn>
              
              <div className='flex gap-8'>
                 <Button className="cursor-pointer futuristic-button">Design UFO</Button>
                 <Button className="cursor-pointer futuristic-button">saved aliens</Button>
              </div>
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
