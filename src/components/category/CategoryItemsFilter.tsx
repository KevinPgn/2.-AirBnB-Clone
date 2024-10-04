"use client"
import categoryItems from "@/lib/categoryItems"
import {cn} from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

export const CategoryItemsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');

  const handleClick = (itemName: string) => {
    if(categoryQuery === itemName) {
      router.push('/');
    } else {
      router.push(`/?category=${itemName}`);
    }
  }

 return <div className="flex items-center justify-between mt-3 w-full">
      {categoryItems.map((item) => (
        <div
        onClick={() => handleClick(item.title)}
        key={item.id} className={cn("flex hover:bg-gray-100 relative cursor-pointer duration-75 py-3 items-center flex-col gap-2 w-full", 
        categoryQuery === item.title ? "font-bold text-blue-500" : "")}
        >
          {categoryQuery === item.title && (
            <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-500"></div>
          )}
            <img src={item.imageUrl} alt={item.name} width={20} height={20} />
            <span>{item.title}</span>
        </div>
      ))}
  </div>
}