import CarteMonde from "@/components/newAirBnBHome/countryForm/CarteMonde"
import categoryItems from "@/lib/categoryItems"
import { DatePickerWithRange } from "./DatePickRange"
import dynamic from "next/dynamic"
import { getSession } from "../utils/CacheSession"

export const Home = async ({home}: any) => {
  const category = categoryItems.find((category) => category.title === home.type)
  const isBooked = home.isBooked
  const session = await getSession()

  const LazyMap = dynamic(() => import('@/components/newAirBnBHome/countryForm/CarteMonde'), {
    loading: () => <p>Chargement de la carte...</p>,
    ssr: false,
  })

  return <div className="mb-5">
    <h2 className='text-2xl font-bold mb-3'>{home.title}</h2>
    <img src={home.photo} alt={home.title} loading="lazy" width={450} height={300} className='rounded-lg w-full h-[600px] object-cover' />

    <div className="flex justify-between mt-5">
        <div className="flex flex-col gap-1 w-[60%]">
            <div className="flex items-center gap-2">
                <p className="font-bold text-xl">{home.country}</p>
                <span className="text-red-500 font-bold text-xl">{home.price}€ / night</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-gray-500">{home.guests} guests *</span>
                <span className="text-gray-500">{home.bedrooms} bedrooms *</span>
                <span className="text-gray-500">{home.bathrooms} bathrooms</span>
            </div>

            <div className="flex items-center gap-3 mt-5">
                <img src={home.owner.image} alt={home.owner.name} width={40} height={40} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-semibold">Hosted by {home.owner.name}</p>
                    <p className="text-gray-500 text-sm">Host since {new Date(home.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            
            <div className="w-full h-[1px] bg-gray-200 my-7"></div>


           {/* Mettre image de la categorie ainsi dque mettre son type */}
           <div className="flex items-center gap-3">
                <img src={category?.imageUrl} alt={category?.name} loading="lazy" width={50} height={50} />
                <div className="flex flex-col">
                    <p className="font-bold text-lg">{category?.title}</p>
                    <p className="text-gray-700 text-sm font-medium">{category?.description}</p>
                </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 my-7"></div>
            
            <p className="text-gray-700 text-md">{home.description}</p>
        
            <LazyMap locationValue={home.country} />
        </div>

        <div>
            <h3 className="text-xl font-bold mb-5">When do you want to stay?</h3>
            {/* session user id === home.owner.id */}
            {session?.user?.id === home.owner.id ? <p className="text-red-500 text-sm mt-5">You are the owner of this home</p> : <DatePickerWithRange homeId={home.id} price={home.price} bookings={home.bookings} isBooked={isBooked}/>}
            {isBooked && <p className="text-red-500 text-sm mt-5">Your already demand a booking for this home</p>}
        </div>
    </div>
  </div>
}