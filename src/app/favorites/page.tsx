import { FavoriteHomes } from "@/components/favoritesComponents/FavoriteHomes"
import { getFavoriteHomes } from "@/server/FavoriteHome"

const FavoritesPage = async () => {
  const favoriteHomes = await getFavoriteHomes({})
  console.log(favoriteHomes)
  return (
    <section className="py-5 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-5">Your favorite homes</h1>
      
    </section>
  )
}

export default FavoritesPage