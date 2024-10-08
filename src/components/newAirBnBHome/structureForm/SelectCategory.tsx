"use client"
import React from "react"
import categoryItems from "@/lib/categoryItems"
import { useStore } from "@/lib/store"
import {cn} from "@/lib/utils"

export const SelectCategory = () => {
    const type = useStore((state) => state.type)
    const setType = useStore((state) => state.setType)

    const handleType = (type: string) => {
        setType(type)
    }
  
  return <div className="flex items-center flex-wrap w-full gap-10 mt-7">
    {categoryItems.map((item) => (
        <div 
        onClick={() => handleType(item.title)}
        key={item.id} className={cn(
            "w-[220px] cursor-pointer p-5 py-7 border-2 border-gray-200 rounded-lg",
            type === item.title ? "border-red-300 border-2" : ""
        )}>
            <img src={item.imageUrl} alt={item.title} className="w-10 h-10" />
            <p className="text-sm font-bold mt-1">{item.title}</p>
        </div>
    ))}
  </div>
}