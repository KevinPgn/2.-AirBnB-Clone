"use client"
import React, { useState } from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { useCountries } from '@/lib/countries'
import { useStore } from '@/lib/store'
import dynamic from 'next/dynamic'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export const CountryForm = () => {
  const { getAllCountries, getCountryByValue } = useCountries()
  const { setCountry, setAddress, setType, setInstantBooking } = useStore()
  const [locationValue, setLocationValue] = useState("")
  const instantBooking = useStore((state) => state.instantBooking)
  
  const LazyMap = dynamic(() => import('./CarteMonde'), {
    loading: () => <p>Chargement de la carte...</p>,
    ssr: false,
  })

  const handleCountrySelect = (value: string) => {
    const country = getCountryByValue(value)
    if (country) {
      setCountry(country.label)
      setLocationValue(country.value)
    }
  }

  return (
    <div className='flex flex-col gap-2 mt-5 mb-40'>
      <Select onValueChange={handleCountrySelect}>  
        <SelectTrigger> <SelectValue placeholder="Select a country" /> </SelectTrigger>
        <SelectContent>
          {getAllCountries().map((country) => (
            <SelectItem key={country.value} value={country.value}>
              <div className='flex items-center gap-2'>
                <span role="img" aria-label={`Flag of ${country.label}`}>
                  {country.flag}
                </span>
                <span>{country.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <LazyMap locationValue={locationValue} />
      <Input 
      onChange={(e) => setAddress(e.target.value)}
      placeholder='Address' className='mt-5 mb-5' />
      <Select onValueChange={(value) => setType(value)}> 
        <SelectTrigger> <SelectValue placeholder="Select a type" /> </SelectTrigger>
        <SelectContent>
          <SelectItem value="Entire place">Entire place</SelectItem>
          <SelectItem value="Private room">Private room</SelectItem>
          <SelectItem value="Shared room">Shared room</SelectItem>
        </SelectContent>
      </Select>
      <div className='flex items-center gap-2 mt-3'>
        <Switch 
        checked={instantBooking}
        onCheckedChange={(checked) => setInstantBooking(checked)} />
        <span className='text-sm'>Instant Booking</span>
      </div>
    </div>
  )
}