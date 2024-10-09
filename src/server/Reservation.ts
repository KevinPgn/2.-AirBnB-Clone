"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"

export const createBooking = authenticatedAction
    .schema(z.object({
        startDate: z.date(),
        endDate: z.date(),
        homeId: z.string(),
    }))
    .action(async ({parsedInput: {startDate, endDate, homeId}, ctx:{userId}}) => {
        const home = await prisma.home.findUnique({
            where: {id: homeId},
            select: {
                price: true,
                ownerId: true,
            }
        })

        if (!home || !home.price) {
            throw new Error("Home not found")
        }

        if (home.ownerId === userId) {
            throw new Error("You cannot book your own home")
        }

        const totalPrice = home.price * (endDate.getTime() - startDate.getTime())

        const existingBooking = await prisma.booking.findFirst({
            where: {
                homeId,
                startDate: {
                    gte: startDate,
                },
                endDate: {
                    lte: endDate,
                },
            },
        })

        if (existingBooking) {
            throw new Error("Home is already booked for this period")
        }

        const booking = await prisma.booking.create({
            data: {
                homeId,
                userId,
                startDate,
                endDate,
                totalPrice,
            }
        })

        return booking
    })