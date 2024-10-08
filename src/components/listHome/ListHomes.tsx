import React from "react";
import {Heart} from "lucide-react"
import Image from "next/image";
import Link from "next/link";

export const ListHomes = ({homes}: any) => {
  return <div className="flex flex-wrap gap-7 mt-10 mb-5 items-start justify-center">
    {homes.map((home: any) => (
      <div key={home.id} className="w-[300px] group relative">
        <div className="absolute top-2 cursor-pointer right-2 bg-white rounded-md p-3 group-hover:opacity-100 opacity-0 duration-75">
            <Heart className="text-black" size={20} />
        </div>
        <Link href={`/home/${home.id}`}>
          {home.photo && <Image src={home.photo} alt={home.title} width={300} height={300} className="rounded-md w-[400px] h-[300px] object-cover" />}
        </Link>
          <h2 className="text-lg font-bold mt-4">{home.country} / {home.type}</h2>
          <p className="text-gray-500">{home.description}</p>
          {/* Price / night */}
          <div className="flex items-center mt-3 gap-2">
          <span className="text-lg font-bold">${home.price}</span>
          <span className="text-gray-500">Night</span>
        </div>
      </div>
    ))}
  </div>
}