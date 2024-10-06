import { NextStep } from '@/components/newAirBnBHome/structureForm/NextStep'
import { SelectCategory } from '@/components/newAirBnBHome/structureForm/SelectCategory'
import React from 'react'
import Auth from '@/lib/middleware'

const PageStuctureCategory = () => {
  return (
    <Auth>
      <section className="max-w-[1300px] mx-auto mt-7">
          <h1 className="text-3xl font-bold">Which of these best describe your home?</h1>
          <SelectCategory />
          
          <NextStep />
      </section>
    </Auth>
  )
}

export default PageStuctureCategory