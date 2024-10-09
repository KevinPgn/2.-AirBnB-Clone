"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { revalidatePath } from "next/cache"

export const putFavoriteHome = authenticatedAction
    .schema(z.object({
        homeId: z.string()
    }))
    .action(async ({parsedInput: {homeId}, ctx: {userId}}) => {
        const favorite = await prisma.favorite.findFirst({
            where: { userId, homeId }
        })
        
        if(favorite) {
            await prisma.favorite.delete({
                where: { id: favorite.id }
            })
        } else {
            await prisma.favorite.create({
                data: { userId, homeId }
            })
        }

        revalidatePath(`/home/${homeId}`)
    })

    export const getFavoriteHomes = async (userId: string) => {
        const favoriteHomes = await prisma.favorite.findMany({
            where: {
                userId
            },
            select: {
                home: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        photo: true,
                        country: true,
                        price: true,
                        type: true,
                        instantBooking: true,
                    }
                }
            }
        })
    
        return favoriteHomes
    }