"use client"
import {useSession} from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Auth = ({children}: any) => {
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === "unauthenticated" && !session) router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
  }, [status, session, router])

  return children
}

export default Auth