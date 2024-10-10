import { ListHomes } from "@/components/listHome/ListHomes"
import { NoHomesFind } from "@/features/NoHomesFind"
import { getMyListings } from "@/server/MyListings"

const MyListingsHomesPage = async () => {
  const myListings = await getMyListings({})

  if(myListings?.data?.length === 0) {
    return (
      <div className="px-10">
      <NoHomesFind />
    </div>
    )
  }

  return (
    <section className="py-5 max-w-[1300px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Your listings</h1>
        <div className="flex flex-wrap gap-7 mt-5 mb-5 items-start justify-center">
          {myListings?.data?.map((home: any) => (
            <ListHomes key={home.id} home={home} isFavorite={home.isFavorite}/>
          ))}
        </div>
    </section>
  )
}

export default MyListingsHomesPage