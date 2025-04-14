import React from 'react'
import MemorialForm from './_components/MemorialForm';



export const metadata = {
    title: "მემორიალის შექმნა | მემორია",
    description: "დაამატე ახალი თამადა",
  };

const CreateMemorial = () => {
  return (
    <div>
      create memeorial
      <MemorialForm />
    </div>
  )
}

export default CreateMemorial
