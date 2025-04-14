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
            <Image src = {logo} alt = "logo" width = {200} height={200} />
            </Link>
        </div>

        <div>
            <SignedIn>
              
              
            </SignedIn>

            <SignedOut>
                <SignInButton forceRedirectUrl='/'>
                  <Button className="btn "><LogIn /> შესვლა</Button>
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
