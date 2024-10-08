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

export const getFavoriteHomes = authenticatedAction
        .schema(z.object({}))
        .action(async ({ctx: {userId}}) => {
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
                        ...(userId ? {
                            favorites: {
                                where: {
                                    userId
                                },
                                select: {
                                    id: true
                                }
                            }
                        } : {}),
                    }
                }
            }
        })
    
        return favoriteHomes.map(home => ({
            ...home,
            isFavorite: userId ? home.home.favorites?.length > 0 : false,
        }))
    })