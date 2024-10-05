import React from "react";
import {Heart} from "lucide-react"

export const ListHomes = () => {
  return <div className="flex flex-wrap gap-7 mt-10 mb-5 items-start justify-center">
    {Array.from({length: 10}).map((_, index) => (
      <div key={index} className="w-[300px] group relative">
        <div className="absolute top-2 cursor-pointer right-2 bg-white rounded-md p-3 group-hover:opacity-100 opacity-0 duration-75">
            <Heart className="text-black" size={20} />
        </div>
        <div className="w-full h-[280px] rounded-md" style={{backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`}}></div>
        <h2 className="text-lg font-bold mt-4">France / Europe</h2>
        <p className="text-gray-500">A beautiful home in the center of the city</p>
        {/* Price / night */}
        <div className="flex items-center mt-3 gap-2">
          <span className="text-lg font-bold">${index * 100}</span>
          <span className="text-gray-500">Night</span>
        </div>
      </div>
    ))}
  </div>
}