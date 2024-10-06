"use client"
import React from 'react'
import { useStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

export const FormDescription = () => {
  const {
    title, setTitle,
    description, setDescription,
    price, setPrice,
    photo, setPhoto,
    guests, setGuests,
    bedrooms, setBedrooms,
    bathrooms, setBathrooms
  } = useStore()

  return (
    <div className="space-y-4 mt-5 mb-36">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short and simple..."
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please describe your home..."
        />
      </div>

      <div>
        <Label htmlFor="price">Price per night</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter price"
        />
      </div>

      <div>
        <Label htmlFor="photo">Photo URL</Label>
        <Input
          id="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Enter photo URL"
        />
      </div>

      <div className='border rounded-md p-7 shadow-md space-y-7'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-bold underline'>Guests</h3>
                <span>How many guests do you want?</span>
            </div>
            <div className='flex items-center gap-5'>
                <Button variant="outline" size="icon">
                    <Minus size={18} />
                </Button>
                <span>{guests}</span>
                <Button variant="outline" size="icon">
                    <Plus size={18} />
                </Button>
            </div>
        </div>

        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-bold underline'>Bedrooms</h3>
                <span>How many bedrooms do you want?</span>
            </div>
            <div className='flex items-center gap-5'>
                <Button variant="outline" size="icon">
                    <Minus size={18} />
                </Button>
                <span>{bedrooms}</span>
                <Button variant="outline" size="icon">
                    <Plus size={18} />
                </Button>
            </div>
        </div>

        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-bold underline'>Bathrooms</h3>
                <span>How many bathrooms do you want?</span>
            </div>
            <div className='flex items-center gap-5'>
                <Button variant="outline" size="icon">
                    <Minus size={18} />
                </Button>
                <span>{bathrooms}</span>
                <Button variant="outline" size="icon">
                    <Plus size={18} />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}