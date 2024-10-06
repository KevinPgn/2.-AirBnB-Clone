"use client"
import React from 'react'
import { useStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

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
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a catchy title"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your place"
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

      <div>
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          id="guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          placeholder="Enter number of guests"
        />
      </div>

      <div>
        <Label htmlFor="bedrooms">Number of Bedrooms</Label>
        <Input
          id="bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(Number(e.target.value))}
          placeholder="Enter number of bedrooms"
        />
      </div>

      <div>
        <Label htmlFor="bathrooms">Number of Bathrooms</Label>
        <Input
          id="bathrooms"
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(Number(e.target.value))}
          placeholder="Enter number of bathrooms"
        />
      </div>
    </div>
  )
}