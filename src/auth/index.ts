import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types/global'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function auth(req: AuthRequest, res: Response, next: NextFunction) {
    const token: string = req.header('Authorization') as string

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized - No token provided' })
    }

    try {
        const jwtSecret = process.env.JWT_SIGN || 'secret'
        const decoded: string | JwtPayload | any = jwt.verify(token, jwtSecret) as string | JwtPayload
        const user = await prisma.user.findUnique({
            where: { id: decoded.user_id }
        })

        if (!user) {
            return res.status(403).json({ message: 'Unauthorized - User not found' })
        }
        req.isAdmin = user.role === 'ADMIN',
        req.isUser = user.role === 'USER',
        req.user = user

        next()
    } catch (error) {
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}
export { auth }