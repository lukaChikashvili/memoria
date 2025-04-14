import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='w-full px-12 flex-1 md:pl-56 pt-[80px] h-full '>
       {children}
    </div>
  )
}

export default Layout
