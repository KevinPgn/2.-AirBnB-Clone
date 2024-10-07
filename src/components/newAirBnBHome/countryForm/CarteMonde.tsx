"use client"
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/lib/countries'

export default function CarteMonde({locationValue}: {locationValue: string}) {
  const { getCountryByValue } = useCountries()
  const latlng = getCountryByValue(locationValue)?.latlng

  return (
    <MapContainer center={latlng ?? [52.505, -0.09]}
    zoom={2}
    scrollWheelZoom={false}
    className='h-[50vh] rounded-lg z-0 mt-5'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[52.505, -0.09]} />
    </MapContainer>
  )
}

