import Image from "next/image";
import { Banderole } from "./Banderole";
import { ProfileHeader } from "./ProfileHeader";
import { getSession } from "../utils/CacheSession";

export const Headers = async () => {
  const session = await getSession()

  return <header className="w-full h-24 border-b border-gray-200 py-5">
    <nav className="flex items-center h-full justify-between px-14">
        <Image src="/airbnblogo.png" alt="logo" loading="lazy" width={150} height={150} className="object-contain cursor-pointer" />
        <Banderole />
        <ProfileHeader sessionUser={session} />
    </nav>
  </header>
}