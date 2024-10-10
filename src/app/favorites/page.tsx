import { ListHomes } from "@/components/listHome/ListHomes"
import { NoHomesFind } from "@/features/NoHomesFind"
import { getFavoriteHomes } from "@/server/FavoriteHome"
    
const FavoritesPage = async () => {
  const favoriteHomes = await getFavoriteHomes({})
  
  if(favoriteHomes?.data?.length === 0) {
    return (
      <div className="px-10">
      <NoHomesFind />
    </div>
    )
  }

  return (
    <section className="py-5 max-w-[1300px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Your favorite homes</h1>
        <div className="flex flex-wrap gap-7 mt-5 mb-5 items-start justify-center">
            {favoriteHomes?.data?.map((home: any) => (
          <ListHomes key={home.home.id} home={home.home} isFavorite={home.isFavorite}/>
        ))}
        </div>
    </section>
  )
}

export default FavoritesPage