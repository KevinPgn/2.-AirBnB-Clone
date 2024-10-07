"use client"
import React, { useState } from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { useCountries } from '@/lib/countries'
import { useStore } from '@/lib/store'
import dynamic from 'next/dynamic'


export const CountryForm = () => {
  const { getAllCountries, getCountryByValue } = useCountries()
  const { setCountry } = useStore()
  const [locationValue, setLocationValue] = useState("")
  
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
    <div className='flex flex-col gap-2 mt-5'>
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
    </div>
  )
}