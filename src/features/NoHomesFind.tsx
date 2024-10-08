import { FileQuestion } from "lucide-react"

export const NoHomesFind = () => {
  return <div className="mt-16 flex flex-col items-center justify-center">
    <div className="flex items-center justify-center p-5 w-[70px] h-[70px] bg-red-100 rounded-full">
      <FileQuestion size={60} className="text-red-500" />
    </div>
    <p className="font-semibold text-2xl mt-5">Sorry no listings found for this category...</p>
    <span className="text-gray-500 mt-3">Please check a other category or create your own listing</span>
  </div>
}