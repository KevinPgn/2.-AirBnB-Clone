"use client"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { putFavoriteHome } from "@/server/FavoriteHome"
import { useOptimistic, useTransition } from "react"

interface FavoriteHomeProps {
  isFavorite: boolean
  homeId: string
}

export const FavoriteHome = ({ isFavorite: initialIsFavorite, homeId }: FavoriteHomeProps) => {
  const [isPending, startTransition] = useTransition()
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    initialIsFavorite,
    (state, newState: boolean) => newState
  )

  const handleFavorite = async () => {
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite)
      await putFavoriteHome({ homeId })
    })
  }

  return (
    <div
      onClick={handleFavorite}
      className={cn(
        "absolute top-2 cursor-pointer right-2 bg-white rounded-md p-3",
        "group-hover:opacity-100 opacity-0 duration-75",
        isPending && "animate-pulse"
      )}
    >
      <Heart
        className={cn(
          "text-black",
          optimisticFavorite ? "fill-red-500 text-red-500" : "text-black"
        )}
        size={20}
      />
    </div>
  )
}