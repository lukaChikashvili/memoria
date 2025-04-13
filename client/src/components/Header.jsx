import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import React from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'

const Header = async ({ isAdminPage = false}) => {
    
  return (
    <div>
        <div>
            logo
        </div>

        <div>
            <SignedIn>
              <h1>you are signed in</h1>
              
            </SignedIn>

            <SignedOut>
                <SignInButton forceRedirectUrl='/'>
                  <Button><LogIn /> sign in</Button>
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
