import { PrismaClient } from "@prisma/client"

import { hashingPassword } from "../hash"

export const prisma = new PrismaClient()

export async function createUserIfNotExists() {

    const hashPassword = await hashingPassword("123")
    
    const existingUser = await prisma.user.findUnique({
        where: { email: 'admin@gmail.com' }
    })

    if (!existingUser) {
        await prisma.user.create({
            data: {
                email: 'admin@gmail.com',
                password: hashPassword,
                role: "ADMIN"
            }
        })
    }
}