import { FavoriteHomes } from "@/components/favoritesComponents/FavoriteHomes"
import { NoHomesFind } from "@/features/NoHomesFind"
import { getFavoriteHomes } from "@/server/FavoriteHome"

const FavoritesPage = async () => {
  const favoriteHomes = await getFavoriteHomes({})
  const data = favoriteHomes?.data

  return (
    <section className="py-5 max-w-[1300px] mx-auto">
        <h1 className="text-2xl font-bold mb-5">Your favorite homes</h1>
        {data && data.length > 0 ? (
            <FavoriteHomes favoriteHomes={data} />
        ) : (
            <NoHomesFind />
        )}
    </section>
  )
}

export default FavoritesPage