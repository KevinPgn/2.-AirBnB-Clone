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


// Get all homes
export const getHomes = async (category?: string) => {
    const session = await getSession()
    const userId = session?.user?.id

    const homes = await prisma.home.findMany({
        where: {
            ...(category ? { type: category } : {}),
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

    return homes.map(home => ({
        ...home,
        isFavorite: userId ? home.favorites?.length > 0 : false,
    }))
}

    // Get a single home
export const getHome = async (homeId: string) => {
    const session = await getSession()
    const userId = session?.user?.id
    
    const home = await prisma.home.findUnique({
        where: { id: homeId },
        select: {
            id: true,
            title: true,
            description: true,
            photo: true,
            country: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            price: true,
            address: true,
            type: true,
            instantBooking: true,
            createdAt: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            bookings: {
                select: {
                    startDate: true,
                    endDate: true,
                } 
            },
            ...(userId ? {
                bookings: {
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
        ...home,
        isBooked: userId ? home?.bookings?.length ?? 0 > 0 : false,
    }
}

