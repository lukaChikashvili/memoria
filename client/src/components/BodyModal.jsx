import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { ThemeContext } from '@/context/ThemeContext';

const BodyModal = () => {
    const colors = ['#FFDEDE', '#E8C999', '#C9B194', '#945034', '#A9B5DF', 'black'];
    const haircolors = ['#1C1C1C', '#3B2F2F', '#A1866F', '#954535', '#B8860B', '#D1B280', '#F2D16B', '#E5E4E2', '#F8BBD0', '#008080', '#98FF98',
'#00FFFF', '#FF0000'];
   const eyecolor = ['#FFDEDE', '#E8C999', '#C9B194', '#945034', '#A9B5DF', 'black'];

    const { setBodyColor, setHair, setEye } = useContext(ThemeContext);

    
  return (
    <div className='h-screen px-12 relative w-[43rem] '>

  <div className='absolute inset-0 z-10 px-12 flex flex-col gap-6'>
 
 

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


  <Card className="relative z-10">
    <CardHeader>
      <CardTitle>თმის ფერი</CardTitle>
      <CardDescription>შეცვალეთ თმის ფერი</CardDescription>
    </CardHeader>

    <CardContent>
      <div className='flex gap-4 flex-wrap'>
        {haircolors.map((color) => (
          <Button
            key={color}
            onClick={() => setHair(color)}
            className="w-8 h-8 rounded-lg cursor-pointer hover:border-white"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </CardContent>
  </Card>

  <Card className="relative z-10">
    <CardHeader>
      <CardTitle>თვალის ფერი</CardTitle>
      <CardDescription>შეცვალეთ თვალის ფერი</CardDescription>
    </CardHeader>

    <CardContent>
      <div className='flex gap-4 flex-wrap'>
        {eyecolor.map((color) => (
          <Button
            key={color}
            onClick={() => setEye(color)}
            className="w-8 h-8 rounded-lg cursor-pointer hover:border-white"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </CardContent>
  </Card>

 
</div>
</div>

  )
}

export default BodyModal
