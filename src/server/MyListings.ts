"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"

// get all homes from the user


export const getMyListings = authenticatedAction
        .schema(z.object({}))
        .action(async ({ctx: {userId}}) => {
            const myListings = await prisma.home.findMany({
                where: {
                    ownerId: userId
                },
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
            })
    
        return myListings.map(home => ({
            ...home,
            isFavorite: userId ? home.favorites?.length > 0 : false,
        }))
    })