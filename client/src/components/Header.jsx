"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import React, { useContext } from 'react'
import { Button } from './ui/button'
import { ImageIcon, Images, LogIn, MessageCircle, PersonStanding, Shirt } from 'lucide-react'

import { ThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'
import logo from '../assets/logo.png'
import { ScreenCapture } from 'react-screen-capture'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header =  ({ isAdminPage = false}) => {

  const { setBodyModal, setImageUrl,bodyModal, clothModal, setClothModal, setScreenshotModal } = useContext(ThemeContext);

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
      setScreenshotModal(true);

    };

    const router = useRouter();
    const isGalleryPage = router.pathname === "/gallery";
  
  return (
    (
      <div className="w-full relative z-10">
       
        <div className="w-full  items-center justify-between px-20 h-36 hidden md:flex">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Image src={logo} alt="logo" width={100} height={100}  className='sm:inline '/>
            </Link>
            <Button
              variant="outline"
              style={{ backgroundColor: isGalleryPage ? '#3A59D1' : '' }}
              className="flex items-center"
            >
              <Link href="/gallery" className="flex items-center gap-2">
                <Images /> გალერეა
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/feed" className="flex items-center gap-2">
                <MessageCircle /> პოსტები
              </Link>
            </Button>
          </div>
  
          <div className="flex gap-4">
            <SignedIn>
              <Button
                variant="outline"
                className="cursor-pointer flex items-center gap-4"
                style={{ backgroundColor: clothModal ? '#3A59D1' : '', color: clothModal ? '#fff' : '' }}
                onClick={openCloth}
              >
                <Shirt size={30} /> ტანსაცმელი
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                style={{ backgroundColor: bodyModal ? '#3A59D1' : '', color: bodyModal ? '#fff' : '' }}
                onClick={closeBody}
              >
                <PersonStanding /> სხეული
              </Button>
  
              <ScreenCapture onEndCapture={handleScreenCapture}>
                {({ onStartCapture }) => (
                  <div >
                    <Button className="cursor-pointer" variant="outline" onClick={onStartCapture}>
                      <ImageIcon /> სქრინშოტი
                    </Button>
                  </div>
                )}
              </ScreenCapture>
            </SignedIn>
  
            <SignedOut >
              <SignInButton forceRedirectUrl="/">
                <Button variant="outline" className="cursor-pointer futuristic-button">
                  <LogIn /> Enter
                </Button>
              </SignInButton>
            </SignedOut>
  
          <div className=''>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarImage: 'w-36 h-36',
                  },
                }}
              />
            </SignedIn>
            </div>
          </div>
        </div>
  
      
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden z-50 ">
          <div className="flex justify-between items-center py-3 px-6 ">
            <Link href="/gallery">
              <Button variant="outline" className="w-12 h-12 rounded-full flex justify-center items-center">
                <Images size={24} />
              </Button>
            </Link>
            <Link href="/feed">
              <Button variant="outline" className="w-12 h-12 rounded-full flex justify-center items-center">
                <MessageCircle size={24} />
              </Button>
            </Link>
            <SignedIn>
              <Button
                variant="outline"
                className="w-12 h-12 rounded-full flex justify-center items-center"
                style={{ backgroundColor: clothModal ? '#3A59D1' : '', color: clothModal ? '#fff' : '' }}
                onClick={openCloth}
              >
                <Shirt size={24} />
              </Button>
            </SignedIn>
            <SignedIn>
              <Button
                variant="outline"
                className="w-12 h-12 rounded-full flex justify-center items-center"
                style={{ backgroundColor: bodyModal ? '#3A59D1' : '', color: bodyModal ? '#fff' : '' }}
                onClick={closeBody}
              >
                <PersonStanding size={24} />
              </Button>
            </SignedIn>

            <SignedIn>
            <ScreenCapture onEndCapture={handleScreenCapture}>
                {({ onStartCapture }) => (
                  <div >
                    <Button className="w-12 h-12 rounded-full flex justify-center items-center" variant="outline" onClick={onStartCapture}>
                      <ImageIcon /> 
                    </Button>
                  </div>
                )}
              </ScreenCapture>
            </SignedIn>
            <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <Button variant="outline" className="w-12 h-12 rounded-full flex justify-center items-center">
                  <LogIn size={24} />
                </Button>
              </SignInButton>
            </SignedOut>

            <div className=''>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarImage: 'w-36 h-36',
                  },
                }}
              />
            </SignedIn>
            </div>
          </div>
          </div>

          </div>
        
      

    )
     
  )
}

export default Header
