import { PrismaClient } from '@prisma/client'
import { hashingPassword } from '../hash'
import { NextFunction, Request, Response } from 'express'

export const prisma = new PrismaClient()

export async function createUserIfNotExists(req: Request, res: Response, next: NextFunction) {
  try {
    const hashPassword = await hashingPassword('admin')

    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@gmail.com' },
    })

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: 'admin@gmail.com',
          password: hashPassword,
          role: 'ADMIN',
        },
      })
    }

    next()
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error ' + (err as Error).message,
    })
  }
}
