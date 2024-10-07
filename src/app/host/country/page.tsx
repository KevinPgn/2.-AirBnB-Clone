import { NextStepCountry } from '@/components/newAirBnBHome/countryForm/NextStepCountry'
import Auth from '@/lib/middleware'
import React from 'react'
import { CountryForm } from '@/components/newAirBnBHome/countryForm/CountryForm'

const CountryPage = () => {
  return (
    <Auth>
    <section className="max-w-[1300px] mx-auto mt-7">
        <h1 className="text-3xl font-bold">Where is your home located?</h1>
        <CountryForm />
        
        <NextStepCountry />
    </section>
  </Auth>
  )
}

export default CountryPage