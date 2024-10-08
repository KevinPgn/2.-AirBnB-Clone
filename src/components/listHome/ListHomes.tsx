import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteHome } from "./FavoriteHome"

export const ListHomes = ({home, isFavorite}: any) => {
  return <div className="flex flex-wrap gap-7 mt-10 mb-5 items-start justify-center">
      <div key={home.id} className="w-[300px] group relative">
        <FavoriteHome isFavorite={isFavorite} homeId={home.id}/>
        <Link href={`/home/${home.id}`}>
          {home.photo && <Image src={home.photo} alt={home.title} width={450} height={300} className="rounded-md w-[450px] h-[300px] object-cover" />}
        </Link>
          <h2 className="text-lg font-bold mt-4">{home.country} / {home.type}</h2>
          <p className="text-gray-500">{home.description}</p>
          {/* Price / night */}
          <div className="flex items-center mt-3 gap-2">
          <span className="text-lg font-bold">${home.price}</span>
          <span className="text-gray-500">Night</span>
        </div>
      </div>
  </div>
}