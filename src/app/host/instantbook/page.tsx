import React from 'react'
import Auth from '@/lib/middleware'
import { InstantBookform } from '@/components/newAirBnBHome/instantBookingForm/InstantBookform'
import { NextStep } from '@/components/newAirBnBHome/structureForm/NextStep'

const InstantBookPage = () => {
  return (
    <Auth>
      <section className="max-w-[1300px] mx-auto mt-7">
          <h1 className="text-3xl font-bold">Instant Booking your home</h1>
          <InstantBookform />
          
          <NextStep />
      </section>
    </Auth>
  )
}

export default InstantBookPage