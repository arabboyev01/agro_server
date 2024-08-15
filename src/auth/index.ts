import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types/global'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.header('Authorization') as string
  const token = authorizationHeader.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized - No token provided' })
  }

  try {
    const jwtSecret = process.env.JWT_SIGN || 'secret'
    const decoded: string | JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload | string
    const user = await prisma.user.findUnique({
      where: { id: (decoded as JwtPayload).user_id },
    })

    if (!user) {
      return res.status(403).json({ message: 'Unauthorized - User not found' })
    }
    if (req) {
      req.isAdmin = user?.role === 'ADMIN'
      req.isUser = user?.role === 'USER'
      req.user = user
    }

    next()
  } catch (error: unknown) {
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong' + (error as Error).message,
    })
  }
}
export { auth }
