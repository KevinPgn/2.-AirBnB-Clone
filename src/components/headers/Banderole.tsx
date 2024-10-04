import { Search } from "lucide-react"

export const Banderole = () => {
  return <div className="w-fit px-10 py-2 border rounded-full border-gray-200 flex items-center gap-5">
    <span className="text-lg text-black font-medium border-r border-gray-200 pr-5">Anywhere</span>
    <span className="text-lg text-black font-medium border-r border-gray-200 pr-5">Any week</span>
    <span className="text-lg text-black font-medium border-r border-gray-200 pr-5">Add guests</span>
    <div className="text-lg cursor-pointer text-white rounded-full bg-red-600 px-3 py-3 font-medium">
        <Search size={20} />
    </div>
  </div>
}