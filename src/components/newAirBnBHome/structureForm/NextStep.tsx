"use client"
import React from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const NextStep = () => {
  const type = useStore((state) => state.type)
  const router = useRouter()

  const handleNext = () => {
    router.push("/host/description")
  }

  return <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 shadow-md h-[130px] z-10 p-5 flex items-center justify-between">
    <Button variant="outline" className="px-7 py-5 hover:bg-gray-100" onClick={() => router.back()}>Back</Button>
    <Button
    disabled={!type}
    className="px-7 py-5 bg-red-500 text-white hover:bg-red-600"
    onClick={handleNext}>Next</Button>
  </div>
}