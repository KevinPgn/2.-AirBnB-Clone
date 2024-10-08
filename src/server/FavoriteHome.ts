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
            where: {
                userId,
                homeId
            }
        })

        if(favorite) {
            await prisma.favorite.delete({
                where: {
                    id: favorite.id
                }
            })
        } else {
            await prisma.favorite.create({
                data: {
                    userId,
                    homeId
                }
            })
        }

        revalidatePath(`/home/${homeId}`)
    })