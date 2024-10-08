"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { revalidatePath } from "next/cache"
import { getSession } from "@/components/utils/CacheSession"

export const createHome = authenticatedAction
    .schema(z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        photo: z.string().min(1),
        guests: z.number().min(1),
        bedrooms: z.number().min(1),
        bathrooms: z.number().min(1),
        country: z.string().min(1),
        price: z.number().min(1),
        address: z.string().min(1),
        type: z.string().min(1),
        instantBooking: z.boolean().optional(),
    }))
    .action(async ({parsedInput: {title, description, photo, guests, bedrooms, bathrooms, country, price, address, type, instantBooking}, ctx:{userId}}) => {
        const home = await prisma.home.create({
            data: {
                title, description, photo, guests, bedrooms, bathrooms, country, price, address, type, instantBooking, ownerId: userId
            }
        })

        revalidatePath("/")
        return home
    })

// User can book a home
export const bookHome = authenticatedAction
    .schema(z.object({
        homeId: z.string().min(1),
        startDate: z.date(),
        endDate: z.date(),
    }))
    .action(async ({parsedInput: {homeId, startDate, endDate}, ctx:{userId}}) => {
        const home = await prisma.home.findUnique({
            where: {
                id: homeId
            }
        })

        if(!home || !home.price) {
            throw new Error("Home not found")
        }

        // Check if the home is already booked for the given dates
        const existingBooking = await prisma.booking.findFirst({
            where: {
                homeId,
                startDate: {
                    gte: startDate,
                    lte: endDate
                },
                endDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })

        if(existingBooking) {
            throw new Error("Home is already booked for the given dates")
        }
        
        const totalPrice = home.price * (endDate.getTime() - startDate.getTime())

        const booking = await prisma.booking.create({
            data: {
                homeId, 
                startDate, 
                endDate, 
                userId,
                totalPrice,
            }
        })

        revalidatePath("/")
        return booking
    })


// Get all homes
export const getHomes = async (category?: string) => {
    const session = await getSession()
    const userId = session?.user?.id
    
    const homes = await prisma.home.findMany({
        where: {
            ...(category ? {type: category} : {}),
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
    return {
        homes,
        isFavorite: homes.map((home) => home.favorites.length > 0)
    }
}

    // Get a single home
export const getHome = async (homeId: string) => {
    const home = await prisma.home.findUnique({
        where: { id: homeId },
        select: {
            id: true,
            title: true,
            description: true,
            photo: true,
            country: true,
            price: true,
            address: true,
            type: true,
            instantBooking: true,
            owner: {
                select: {
                    id: true,
                    
                }
            },
            bookings: {
                select: {
                    startDate: true,
                    endDate: true,
                } 
            },
        }
    })
    return home
}

// Get favorite homes
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
