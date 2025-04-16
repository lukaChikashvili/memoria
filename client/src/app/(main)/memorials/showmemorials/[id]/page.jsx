import { GetMemorialsById } from '@/actions/memorials';

import React from 'react'
import MemorialsDetail from './_components/MemorialsDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const result = await GetMemorialsById(id);
  
    if (!result.success) {
      return {
        title: "მემორიალი ვერ მოიძებნა ",
        description: "მოთხოვნილი მემორიალი ვერ მოიძებნა",
      };
    }
  
    const memorial = result.data;
  
    return {
      title: `${memorial.birthYear} ${memorial.deathYear} ${memorial.fullName} `,
      description: tamada.description.substring(0, 160),
      openGraph: {
        images: memorial.images?.[0] ? [memorial.images[0]] : [],
      },
    };
  }

const page = async ({params}) => {

    const { id } = await params;

    const result = await GetMemorialsById(id);


  
    
    if (!result.success) {
      notFound();
    }
  return (
    <div>
        <div className="container mx-auto px-4 py-12 ">
      <MemorialsDetail memorial={result}  />
  </div>
    </div>
  )
}

export default page
