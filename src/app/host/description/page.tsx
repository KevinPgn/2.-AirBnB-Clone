import React from 'react'
import { NextStep } from '@/components/newAirBnBHome/structureForm/NextStep'
import { FormDescription } from '@/components/newAirBnBHome/descriptionForm/formDescription'
import Auth from '@/lib/middleware'

const PageDescriptionHome = () => {
  return (
    <Auth>
        <section className="max-w-[1300px] mx-auto mt-7">
            <h1 className="text-3xl font-bold">Please describe your home as good as you can?</h1>
            <FormDescription />

            <NextStep />
        </section>
    </Auth>
  )
}

export default PageDescriptionHome