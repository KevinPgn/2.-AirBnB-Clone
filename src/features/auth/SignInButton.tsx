"use client"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react"

export const SignInButton = () => {
  return <>
    <Button variant="outline" onClick={() => signIn()}>Login</Button>
  </>
}