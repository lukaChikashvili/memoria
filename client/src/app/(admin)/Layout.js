import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <div>
       <div className='flex items-start w-full '>
  
  <div className="flex h-full w-56 items-start top-20 z-50">
    <Sidebar />
  </div>

  
  <main className="flex-1 md:pl-56 pt-[80px] h-full px-12">
    {children}
  </main>
</div>
    </div>
  )
}

export default AdminLayout
