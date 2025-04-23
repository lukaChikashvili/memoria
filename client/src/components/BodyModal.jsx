

import React, { useContext, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import { addBody, getBody } from '@/actions/memorials';
import { toast } from 'sonner';

const BodyModal = () => {
    const colors = ['#FFDEDE', '#E8C999', '#C9B194', '#945034', '#A9B5DF', 'black'];
    const haircolors = ['#1C1C1C', '#3B2F2F', '#A1866F', '#954535', '#B8860B', '#D1B280', '#F2D16B', '#E5E4E2', '#F8BBD0', '#008080', '#98FF98',
'#00FFFF', '#FF0000'];
   const eyecolor = ['#FFDEDE', '#E8C999', '#C9B194', '#945034', '#A9B5DF', 'black'];

    const { setBodyColor, setHair, setEye, bodyColor, hair, eye, setBodyModal } = useContext(ThemeContext);

    const saveBody = async () => {
        try {
          if(!bodyColor || !hair || !eye) {
            toast.error("აირჩიეთ თმის, კანის და თვალის ფერი");
          }else {
            const res = await addBody({bodyColor, hair, eye});
            if(res.success) {
              toast.success("ცვლილება შეინახა წარმატებით");
             setBodyModal(false);
            }
          }
          
          
        } catch (error) {
           console.log(error);
        }
    }

    

    

    
  return (
    <div className="h-screen w-full md:w-1/2 -mt-8 px-4 sm:px-8 md:px-12 relative z-10 flex justify-center items-start overflow-y-auto ">
    <div className="w-full max-w-4xl pt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>მთლიანი სხეული</CardTitle>
          <CardDescription>შეცვალეთ სხეულის ფერი</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 sm:gap-4">
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

      <Card>
        <CardHeader>
          <CardTitle>თმის ფერი</CardTitle>
          <CardDescription>შეცვალეთ თმის ფერი</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 sm:gap-4">
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

      <Card>
        <CardHeader>
          <CardTitle>თვალის ფერი</CardTitle>
          <CardDescription>შეცვალეთ თვალის ფერი</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 sm:gap-4">
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
      <div className="flex ">
        <Button className="bg-[#3A59D1] text-white" onClick={saveBody}>შენახვა</Button>
      </div>
     
    </div>
  </div>


  )
}

export default BodyModal
