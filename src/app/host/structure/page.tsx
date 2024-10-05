import { SelectCategory } from '@/components/newAirBnBHome/structureForm/SelectCategory'
import React from 'react'

const PageStuctureCategory = () => {
  return (
    <section className="max-w-[1300px] mx-auto mt-7">
        <h1 className="text-3xl font-bold">Which of these best describe your home?</h1>
        <SelectCategory />
    </section>
  )
}

export default PageStuctureCategory