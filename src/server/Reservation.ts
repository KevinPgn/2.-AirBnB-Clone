"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"

export const createBooking = authenticatedAction
    .schema(z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
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

        const totalPrice = home.price * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

        const existingBooking = await prisma.booking.findFirst({
            where: {
                homeId,
                OR: [
                    {
                        AND: [
                            { startDate: { lte: startDate } },
                            { endDate: { gte: startDate } }
                        ]
                    },
                    {
                        AND: [
                            { startDate: { lte: endDate } },
                            { endDate: { gte: endDate } }
                        ]
                    },
                    {
                        AND: [
                            { startDate: { gte: startDate } },
                            { endDate: { lte: endDate } }
                        ]
                    }
                ]
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

        return {
            ...booking,
            message: "Booking created successfully",
        }
    })