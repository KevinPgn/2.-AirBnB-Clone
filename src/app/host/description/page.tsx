import React from 'react'
import { NextStepDescription } from '@/components/newAirBnBHome/descriptionForm/NextStepDescription'
import { FormDescription } from '@/components/newAirBnBHome/descriptionForm/formDescription'
import Auth from '@/lib/middleware'

const PageDescriptionHome = () => {
  return (
    <Auth>
        <section className="max-w-[1300px] mx-auto mt-7">
            <h1 className="text-3xl font-bold">Please describe your home as good as you can?</h1>
            <FormDescription />

            <NextStepDescription />
        </section>
    </Auth>
  )
}

export default PageDescriptionHome