import { GetMemorials } from '@/actions/memorials';
import MemorialStone from '@/components/MemorialStone';
import React from 'react'

export const metadata = {
  title: "ყველა მემორიალი | memoria",
};

const showMemorials = async () => {
  const allmemorials = await GetMemorials();

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 md:px-4 py-10">
      {allmemorials.map((value, index) => (
        <div key={index} className="flex justify-center items-center">
          <MemorialStone stone={value} />
        </div>
      ))}
    </div>
  );
};

export default showMemorials;

