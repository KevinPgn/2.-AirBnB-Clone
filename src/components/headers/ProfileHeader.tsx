"use client"
import {Menu} from "lucide-react"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/dropdown-menu"
import { SignInButton } from "@/features/auth/SignInButton"
import { SignOutButton } from "@/features/auth/SignOutButton"

export const ProfileHeader = ({sessionUser}: {sessionUser: any}) => {
  return <div className="w-fit px-5 py-2 border rounded-full border-gray-200 flex items-center gap-5">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="text-lg cursor-pointer text-black font-medium"><Menu size={24} /></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer w-full">Airbnb your home</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer w-full">My reservations</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer w-full">My favorites</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer w-full">My Listings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer w-full">Reservation activity</DropdownMenuItem>
        <DropdownMenuSeparator />
        {sessionUser ? <DropdownMenuItem className="cursor-pointer w-full">
            <SignOutButton />
        </DropdownMenuItem> : <DropdownMenuItem className="cursor-pointer w-full">
                <SignInButton />
            </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
    
    <Avatar>
        <AvatarImage src={sessionUser?.user?.image} />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
}