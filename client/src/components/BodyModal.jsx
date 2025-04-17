import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { ThemeContext } from '@/context/ThemeContext';

const BodyModal = () => {
    const colors = ['#FFDEDE', '#E8C999', '#C9B194', '#945034', '#A9B5DF', 'black'];

    const { setBodyColor } = useContext(ThemeContext);

    
  return (
    <div className='h-screen px-12 relative w-[43rem]'>

  <div className='absolute inset-0 -z-10'>
 
  </div>

  <Card className="relative z-10">
    <CardHeader>
      <CardTitle>მთლიანი სხეული</CardTitle>
      <CardDescription>შეცვალეთ სხეულის ფერი</CardDescription>
    </CardHeader>

    <CardContent>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Button
            key={color}
            onClick={() => setBodyColor(color)}
            className="w-8 h-8 rounded-lg cursor-pointer hover:border-white"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </CardContent>
  </Card>
</div>

  )
}

export default BodyModal
